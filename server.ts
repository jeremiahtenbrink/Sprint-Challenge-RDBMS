import express, { Request, Response } from "express";
import helmet from 'helmet';

const server = express();

const projectsRouter = require( './projects/projects-router' );
const actionsRouter = require( './actions/actions-router' );

server.use( helmet() );
server.use( express.json() );

server.use( '/projects', projectsRouter );
server.use( '/actions', actionsRouter );
server.use( '/', ( req: Request, res: Response ) => {
    res.status( 200 ).json( { message: "yup it works." } );
} );

export default server;