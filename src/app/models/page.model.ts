export class PageModel<T> {
    content!: T[]
    number!: number
    size!: number
    last!: boolean
    first!: boolean
    totalPages!: number
    totalElements!: number
    numberOfElements!: number
    empty!: boolean
}