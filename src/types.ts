
export interface ITypesSupplier{
    name: string
    status: boolean
}
export interface ISupplier {
    name: string
    email: string
    phone: string
    typeId: string
    status: number
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

export interface IClient{
    name: string
    phone: string
    email: string
    status: number
}
export interface IClientModel{
    _id: string
    name: string
    phone: string
    email: string
    status: number
    createdAt: Date
    updatedAt: Date
}