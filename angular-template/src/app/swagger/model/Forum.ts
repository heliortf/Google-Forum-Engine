/**
 * Forum Engine API
 * Forum Engine API
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface Forum {
    /**
     * Forum ID
     */
    id?: string;

    category?: models.Category;

    /**
     * Forum title
     */
    title?: string;

    innerType?: Forum.InnerTypeEnum;

    /**
     * Forum description
     */
    description?: string;

    /**
     * Forum status
     */
    status?: Forum.StatusEnum;

    /**
     * Number of messages on this Forum
     */
    numMessages?: number;

    /**
     * Number of visualizations on this Forum
     */
    numViews?: number;

    createdBy?: models.ForumUser;

    /**
     * When user was created
     */
    createdAt?: string;

    /**
     * When user was updated
     */
    updatedAt?: string;

}
export namespace Forum {
    export enum InnerTypeEnum {
        FORUM = <any> 'FORUM',
        MESSAGE = <any> 'MESSAGE'
    }
    export enum StatusEnum {
        OPEN = <any> 'OPEN',
        CLOSED = <any> 'CLOSED'
    }
}
