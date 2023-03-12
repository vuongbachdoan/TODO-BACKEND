export interface TaskCreateDto {
    workspaceId: string;
    title: string;
    description: string;
    dueDate: Date;
    reminder: Date;
    tag: string;
    order: number
}