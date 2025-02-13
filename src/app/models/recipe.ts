export interface Recipe {
    id: string;
    title: string;
    image: string | null;
    ingredients: { name: string }[];
    instructions: string;
    
    showDetails?: boolean;
}
