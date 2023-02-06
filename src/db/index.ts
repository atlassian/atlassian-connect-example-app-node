import Datastore from 'nedb';
import path from 'path';

export type TenantType = {
    host: string;
    logs: Array<string>
};

export const DBFile = new Datastore({
    filename: path.join(__dirname, './storage/storageFile.db') ,
    autoload: true
});

export const findAll = (successCallback: Function, failureCallback: Function) => {
    DBFile.find({}, (error, data) => {
        if (error) {
            console.log("Error when finding: ", error);
            failureCallback && failureCallback(error);
        } else {
            console.log("Found successfully", data);
            successCallback && successCallback(data);
        }
    });
};

export const findOneInDb = (query: {}, successCallback: Function, failureCallback: Function) => {
    DBFile.findOne(query, (error, data) => {
        if (error) {
            console.log("Error when finding: ", error);
            failureCallback && failureCallback(error);
        } else {
            console.log("Found successfully", data);
            successCallback && successCallback(data);
        }
    });
};

export const insertToDb = (data: any, successCallback: Function, failureCallback: Function) => {
    DBFile.insert(data, (error, data) => {
        if (error) {
            console.log("Error when inserting: ", error);
            failureCallback && failureCallback(error);
        } else {
            console.log("Inserted successfully", data);
            successCallback && successCallback(data);
        }
    });
};

export const updateToDb = (query: {}, newData: any, successCallback: Function, failureCallback: Function) => {
    DBFile.update(query, newData, {}, (error, data) => {
        if (error) {
            console.log("Error when updating: ", error);
            failureCallback && failureCallback(error);

        } else {
            console.log("Updated successfully", data);
            successCallback && successCallback(data);
        }
    });
};

export const removeFromDB = (query: {}, successCallback: Function, failureCallback: Function) => {
    DBFile.remove(query, (error, data) => {
        if (error) {
            console.log("Error when removing: ", error);
            failureCallback && failureCallback(error);
        } else {
            console.log("Removed successfully", data);
            successCallback && successCallback(data);
        }
    });
};