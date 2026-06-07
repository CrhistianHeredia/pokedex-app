import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, forkJoin, of, catchError, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonListItem, PokemonListResponse, PokemonSpecies, EvolutionChain, ChainLink, EvolutionPokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseURL;
  private detailCache = new Map<string, Observable<Pokemon>>();
  private speciesCache = new Map<number, Observable<PokemonSpecies>>();
  private evolutionCache = new Map<string, Observable<EvolutionChain>>();

  readonly pokemonList = signal<PokemonListItem[]>([]);
  readonly totalCount = signal(0);
  readonly loading = signal(false);

  /** Estado persistente del paginador entre navegaciones */
  savedPageIndex = 0;
  savedPageSize = 20;

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
      }),
      catchError(err => {
        this.loading.set(false);
        throw err;
      })
    );
  }

  getPokemonDetail(idOrName: string | number): Observable<Pokemon> {
    const key = String(idOrName);
    if (this.detailCache.has(key)) {
      return this.detailCache.get(key)!;
    }
    const obs = this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${idOrName}`).pipe(
      shareReplay(1),
      catchError(err => {
        this.detailCache.delete(key);
        throw err;
      })
    );
    this.detailCache.set(key, obs);
    return obs;
  }

  private getPokemonSpeciesCached(id: number): Observable<PokemonSpecies> {
    if (this.speciesCache.has(id)) {
      return this.speciesCache.get(id)!;
    }
    const obs = this.http.get<PokemonSpecies>(`${this.baseUrl}/pokemon-species/${id}`).pipe(
      shareReplay(1),
      catchError(err => {
        this.speciesCache.delete(id);
        throw err;
      })
    );
    this.speciesCache.set(id, obs);
    return obs;
  }

  private getEvolutionChainCached(url: string): Observable<EvolutionChain> {
    if (this.evolutionCache.has(url)) {
      return this.evolutionCache.get(url)!;
    }
    const obs = this.http.get<EvolutionChain>(url).pipe(
      shareReplay(1),
      catchError(err => {
        this.evolutionCache.delete(url);
        throw err;
      })
    );
    this.evolutionCache.set(url, obs);
    return obs;
  }

  /** Retorna los datos de la(s) última(s) evolución(es) */
  getLastEvolutions(id: number): Observable<EvolutionPokemon[]> {
    return this.getPokemonSpeciesCached(id).pipe(
      switchMap(species => this.getEvolutionChainCached(species.evolution_chain.url)),
      switchMap(chain => {
        const lastEvolutions = this.findLastEvolutions(chain.chain).filter(name => name !== '');
        if (lastEvolutions.length === 0) return of([]);
        const requests = lastEvolutions.map(name =>
          this.getPokemonDetail(name)
        );
        return forkJoin(requests);
      }),
      catchError(() => of([]))
    );
  }

  private findLastEvolutions(chain: ChainLink): string[] {
    if (!chain.evolves_to || chain.evolves_to.length === 0) {
      return [chain.species.name];
    }
    return chain.evolves_to.flatMap(c => this.findLastEvolutions(c));
  }
}
