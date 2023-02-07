import Datastore from 'nedb';
import path from 'path';

export type TenantType = {
    host: string;
    clientKey: string;
    logs: Array<string>
};

export const DBFile = new Datastore({
    filename: path.join(__dirname, './storage/storageFile.db'),
    autoload: true
});

export const findOneInDb = (query: {}) => new Promise((resolve) => {
    DBFile.findOne(query, (error, data) => {
        if (error) {
            console.error("Error when finding: ", error);
            throw new Error(error);
        } else {
            console.log("Found successfully", data);
            resolve(data);
        }
    });
});

export const insertToDb = (data: any) => new Promise((resolve) => {
    DBFile.insert(data, (error, data) => {
        if (error) {
            console.error("Error when inserting: ", error);
            throw new Error(error);
        } else {
            console.log("Inserted successfully", data);
            resolve(data);
        }
    });
});

export const updateToDb = (query: {}, newData: any) => new Promise((resolve) => {
    DBFile.update(query, newData, {}, (error, data) => {
        if (error) {
            console.error("Error when updating: ", error);
            throw new Error(error);
        } else {
            console.log("Updated successfully", data);
            resolve(data);
        }
    });
});

export const removeFromDB = (query: {}) => new Promise((resolve) => {
    DBFile.remove(query, (error, data) => {
        if (error) {
            console.error("Error when removing: ", error);
            throw new Error(error);
        } else {
            console.log("Removed successfully", data);
            resolve(data);
        }
    });
});