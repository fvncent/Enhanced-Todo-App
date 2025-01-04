export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    category: Category;
    priority: Priority;
    dueDate: string;
}