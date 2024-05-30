export interface IMovie{
    name:string,
    release_date:Date,
    budget:number,
    collections?:number,
    director?:string,
    actor:Array<string>,
    producer:Array<string>
}