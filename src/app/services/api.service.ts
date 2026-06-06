import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, forkJoin, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonListItem, PokemonListResponse, PokemonSpecies, EvolutionChain, ChainLink, EvolutionPokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseURL;

  readonly pokemonList = signal<PokemonListItem[]>([]);
  readonly totalCount = signal(0);
  readonly loading = signal(false);

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<PokemonListResponse> {
    this.loading.set(true);
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon/?limit=${limit}&offset=${offset}`
    ).pipe(
      tap(res => {
        this.pokemonList.set(res.results);
        this.totalCount.set(res.count);
        this.loading.set(false);
      })
    );
  }

  getPokemonDetail(idOrName: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${idOrName}`);
  }

  getPokemonSpecies(id: number): Observable<PokemonSpecies> {
    return this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${id}`);
  }

  getEvolutionChain(url: string): Observable<EvolutionChain> {
    return this.http.get<EvolutionChain>(url);
  }

  /** Retorna los datos de la(s) última(s) evolución(es) */
  getLastEvolutions(id: number): Observable<EvolutionPokemon[]> {
    return this.getPokemonSpecies(id).pipe(
      switchMap(species => this.getEvolutionChain(species.evolution_chain.url)),
      switchMap(chain => {
        const lastEvolutions = this.findLastEvolutions(chain.chain).filter(name => name !== '');
        if (lastEvolutions.length === 0) return of([]);
        const requests = lastEvolutions.map(name =>
          this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`)
        );
        return forkJoin(requests);
      })
    );
  }

  private findLastEvolutions(chain: ChainLink): string[] {
    if (!chain.evolves_to || chain.evolves_to.length === 0) {
      return [chain.species.name];
    }
    // Si el Pokémon actual NO es último, seguimos hasta el final
    return chain.evolves_to.flatMap(c => this.findLastEvolutions(c));
  }
}
