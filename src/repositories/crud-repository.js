import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/index.js";

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    /**
     * The `create` function asynchronously creates a new entry in the database using the provided
     * data.
     * @param data - The `data` parameter in the `create` function represents the information or object
     * that you want to store in the database. It typically includes the fields and values that you
     * want to save in the database table.
     * @returns The `create` method is returning the response from the `this.model.create(data)` call,
     * which is the result of creating a new record in the database based on the provided `data`.
     */
    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

   /**
    * This async function destroys a record in the database based on the provided data.
    * @param data - The `data` parameter in the `destroy` function is the ID of the record that you
    * want to delete from the database.
    * @returns The `destroy` method is returning the response from the `this.model.destroy` operation,
    * which is the result of deleting the record with the specified `id` from the database.
    */
    async destroy(data) {
       
        const response = await this.model.destroy({
        where: {
            id: data
            }
        });

        if(!response){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;
    }

    /**
     * The function uses async/await to retrieve data from a model based on a primary key value.
     * @param data - The `data` parameter in the `get` function is used as the primary key value to
     * search for a specific record in the database using the `findByPk` method of the model.
     * @returns The `get` function is returning the result of the database query performed by
     * `this.model.findByPk(data)`. This function is using `await` to wait for the query to complete
     * and then returning the response from the database.
     */
  
    async get(data) {
     
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
        }
        return response;

    }

 /**
  * The `getAll` function asynchronously retrieves all data from a model and returns the response.
  * @returns The `getAll` method is returning the response from calling `findAll` on the `model`.
  */
    async getAll() {
      
        const response = await this.model.findAll();
        return response;
       
    }
    /// data is the object to be updated and id is the primary key
   /**
    * This async function updates a record in the database using the provided data and id.
    * @param data - The `data` parameter in the `update` method likely refers to the new values that
    * you want to update in the database record. It could be an object containing key-value pairs where
    * the keys represent the columns in the database table and the values represent the new values you
    * want to set for those columns
    * @param id - The `id` parameter in the `update` method is the unique identifier of the data entry
    * that you want to update in the database. It is used to specify which record should be updated
    * with the new data provided in the `data` parameter.
    * @returns The `update` method is returning the response from the database after updating the data
    * for the specified `id`.
    */
    async update(data, id) { 
       
        const response = await this.model.update(data,{
        where: {
            id: id
            }
        });
        return response;
    }

};

export default CrudRepository;

// The above code defines a `CrudRepository` class that provides basic CRUD (Create, Read, Update, Delete) operations for a given Sequelize model.
// The class constructor takes a model as an argument and assigns it to the `model` property.
// Each method (create, destroy, get, getAll, update) interacts with the database using Sequelize methods.