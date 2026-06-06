export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface PokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
  other?: {
    'official-artwork': { front_default: string };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  height: number;
  weight: number;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface PokemonSpecies {
  evolution_chain: { url: string };
}

export interface ChainLink {
  species: { name: string; url: string };
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  chain: ChainLink;
}

export interface EvolutionPokemon {
  name: string;
  id: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

const TYPE_ICONS_BASE = 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons';

export const TYPE_ICONS: Record<string, string> = {
  fire: `${TYPE_ICONS_BASE}/fire.svg`,
  water: `${TYPE_ICONS_BASE}/water.svg`,
  grass: `${TYPE_ICONS_BASE}/grass.svg`,
  electric: `${TYPE_ICONS_BASE}/electric.svg`,
  psychic: `${TYPE_ICONS_BASE}/psychic.svg`,
  ice: `${TYPE_ICONS_BASE}/ice.svg`,
  dragon: `${TYPE_ICONS_BASE}/dragon.svg`,
  dark: `${TYPE_ICONS_BASE}/dark.svg`,
  fairy: `${TYPE_ICONS_BASE}/fairy.svg`,
  fighting: `${TYPE_ICONS_BASE}/fighting.svg`,
  flying: `${TYPE_ICONS_BASE}/flying.svg`,
  ghost: `${TYPE_ICONS_BASE}/ghost.svg`,
  ground: `${TYPE_ICONS_BASE}/ground.svg`,
  poison: `${TYPE_ICONS_BASE}/poison.svg`,
  rock: `${TYPE_ICONS_BASE}/rock.svg`,
  bug: `${TYPE_ICONS_BASE}/bug.svg`,
  steel: `${TYPE_ICONS_BASE}/steel.svg`,
  normal: `${TYPE_ICONS_BASE}/normal.svg`,
};

export function typeIcon(type: string): string {
  return TYPE_ICONS[type] || '';
}

export const TYPE_COLORS: Record<string, string> = {
  fire: '#FF4500',
  water: '#3399FF',
  grass: '#33CC33',
  electric: '#FFD700',
  psychic: '#FF69B4',
  ice: '#00CED1',
  dragon: '#6666FF',
  dark: '#704848',
  fairy: '#FFB6C1',
  fighting: '#FF6347',
  flying: '#87CEEB',
  ghost: '#7B68EE',
  ground: '#DEB887',
  poison: '#9932CC',
  rock: '#BDB76B',
  bug: '#99CC33',
  steel: '#B0C4DE',
  normal: '#D3D3D3',
};

export function typeColor(type: string): string {
  return TYPE_COLORS[type] || '#D3D3D3';
}

export function statColor(value: number): string {
  if (value >= 100) return 'primary';
  if (value >= 60) return 'accent';
  return 'warn';
}
