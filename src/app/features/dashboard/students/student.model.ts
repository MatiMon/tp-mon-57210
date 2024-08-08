export interface IStudent {
    id: string;
    name?: string | null;
    lastname?: string | null;
    course?: string | null;
}

// export type NewStudent = Omit<IStudent, 'id'> & { id: null };