import { Request, Response } from "express";
import { IAction } from "./IAction";
import * as error from "../error/error";

import * as Actions from '../actions/actions-model';

const actionsRouter = require( 'express' ).Router();

actionsRouter.get( '/', async ( req: Request, res: Response ) => {
    try {
        
        let actions = await Actions.getActions();
        res.status( 200 ).json( actions )
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

actionsRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        if ( !req.body.description || !req.body.project_id ) {
            error.sendError(
                error.error( 400, "Please include a id and a project id with" +
                    " your request." ), res );
            return;
        }
        
        const action: IAction = req.body;
        
        let ids = await Actions.addAction( action );
        if ( ids ) {
            let action = await Actions.getActionById( ids[ 0 ] );
            if ( action ) {
                res.status( 200 ).json( action );
                return;
            }
        }
        error.sendError( error.error( 500, "Something went wrong creating the" +
            " action." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

actionsRouter.put( '/', async ( req: Request, res: Response ) => {
    try {
        if ( !req.body.id ) {
            error.sendError(
                error.error( 400, "Please include a id with" +
                    " your request." ), res );
            return;
        }
        const id: number = req.body.id;
        const action: IAction = req.body;
        let result = await Actions.updateAction( id, action );
        if ( result ) {
            let action = await Actions.getActionById( id );
            if ( action ) {
                res.status( 200 ).json( action );
                return;
            }
        }
        error.sendError( error.error( 500, "Something went wrong updating the" +
            " action." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

actionsRouter.delete( '/:id', async ( req: Request, res: Response ) => {
    try {
        
        let id: number = req.params.id;
        if ( !id ) {
            error.sendError( error.error( 400, "You must include an id with" +
                " your request." ), res );
        }
        
        let result = await Actions.removeAction( id );
        if ( result ) {
            res.status( 200 ).json( { message: "The action has be removed." } );
        }
        
        error.sendError(
            error.error( 500, "Somthing went wrong while trying to" +
                " remove the actions." ), res );
        
    } catch ( e ) {
        error.sendError( e, res );
    }
} );

module.exports = actionsRouter;
