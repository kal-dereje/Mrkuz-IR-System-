import {abbreveations} from './stopWordAndAcronymsList/acronymList';

export const tokenization =(docOrQuery)=>{
    let regularExp =  /[a-zA-Z0-9!@#፤':፣።፡\$%\‘’“?”^\&*\)\/(+=._-]/g;
   
    for (const key in abbreveations) 
        docOrQuery =  docOrQuery.replace(new RegExp(key, "gi"), abbreveations[key]) ;
    
    docOrQuery = docOrQuery.replace(regularExp, "")
    
    return docOrQuery
}



