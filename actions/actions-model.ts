import { database } from "../data/dbConfig";
import { IAction } from "./IAction";


export const getActionsForProjectById = ( projectId: number ) => {
    return database( 'actions' ).where( { project_id: projectId } );
};

export const getActions = () => {
    return database( 'actions' );
};

export const getActionById = ( actionId: number ) => {
    return database( 'actions' ).where( { id: actionId } ).first();
};

export const addAction = ( action: IAction ) => {
    return database( 'actions' ).insert( action );
};

export const updateAction = ( actionId: number, action: IAction ) => {
    return database( 'actions' ).where( { id: actionId } ).update( action );
};

export const removeAction = ( actionId: number ) => {
    return database( 'actions' ).where( { id: actionId } ).delete();
};