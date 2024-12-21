export interface IRepository<T> {
    createMany(data: T[]): Promise<void>;
    create?(data: T): Promise<T>;
    update?(data: T): Promise<T>;
    delete?(id: string): Promise<void>;
    findById?(id: string): Promise<T>;
    findAll?(): Promise<T[]>;
}
