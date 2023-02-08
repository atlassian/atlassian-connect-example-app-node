import Datastore from 'nedb-promises';
import path from 'path';

export type TenantType = {
    _id: string | null;
    host: string;
    sharedSecret: string;
    clientKey: string;
    logs: Array<string>
};

export const DBFile = Datastore.create({
    filename: path.join(__dirname, './storage/storageFile.db'),
    autoload: true
});

export const findOneInDb = async (query: {}) => DBFile.findOne(query)
    .then(data => {
        console.log("Found successfully", data);
        return data;
    }).catch((error) => {
        console.error("Error when finding: ", error);
        throw new Error(error);
    });

export const insertToDb = async (data: any) => DBFile.insert(data)
    .then(data => {
        console.log("Inserted successfully", data);
        return data;
    }).catch((error) => {
        console.error("Error when inserting: ", error);
        throw new Error(error);
    });

export const updateToDb = async (query: {}, newData: any) => DBFile.update(query, newData, {})
    .then(data => {
        console.log("Updated successfully", data);
        return data;
    }).catch((error) => {
        console.error("Error when updating: ", error);
        throw new Error(error);
    });

export const removeFromDB = async (query: {}) => DBFile.remove(query, {})
    .then(data => {
        console.log("Removed successfully", data);
        return data;
    }).catch((error) => {
        console.error("Error when removing: ", error);
        throw new Error(error);
    });
