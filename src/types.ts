export interface TDataVariant{
    _id: any
    valueVariant: string
    amount: number
    product: string
    typeVariant: string
}

export interface TClient{
    name: string
    phone: string
    email: string
    status: number
}
export interface TClientModel{
    _id: string
    name: string
    phone: string
    email: string
    status: number
    createdAt: Date
    updatedAt: Date
}