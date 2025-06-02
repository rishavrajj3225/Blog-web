import { use } from "react";
import conf from "../conf/config.js";

import { Client, ID, Storage, Query,Databases  } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, featureImage, slug, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title: title,
          content: content,
          featureImage: featureImage,
          status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  async updatePost(slug, { title, content, featureImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featureImage: featureImage,
          status: status,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  }

  async listPosts(queries = [Query.equal("Key","active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  // file upload
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }
   getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("Error fetching file preview:", error);
      return null;
    }
  }
}


const service = new Service();

export default service;
