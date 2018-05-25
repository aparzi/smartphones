export interface Device {
    id: number
    label: string
    os: string
    price: number
    memory: number
    rate: number
    desc?: string // il punto interrogativo indica che la proprietà è facoltativa
}