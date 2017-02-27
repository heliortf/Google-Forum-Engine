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

export interface Pagination {
    /**
     * Indicates the actual page
     */
    page?: number;

    /**
     * Indicates the number of records per page
     */
    perPage?: number;

    /**
     * Total of records
     */
    total?: number;

    /**
     * Beginning of the list
     */
    begin?: number;

    /**
     * End of the list
     */
    end?: number;

    /**
     * Total of pages
     */
    pages?: number;

}
