export interface TDataVariant{
    _id: any
    valueVariant: string
    amount: number
    product: string
    typeVariant: string
}

export interface IGrouperClientModel {
    _id : string
    name: string
    clientId: string
    phone: string
    status: boolean
}

export interface IAddresModel{
    _id: string
    entity: number
    entityId: string
    departament: string
    municipality: string
    description: string
    referencePoint: string
    status: number
}

export interface IDataGrouperClientModel {
    grouperClient : IGrouperClientModel
    addressGrouper : IAddresModel[]
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