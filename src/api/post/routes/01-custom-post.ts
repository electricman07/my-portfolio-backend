export default {
  routes: [
    {
      method: "GET",
      path: "/posts/archives",
      handler: "api::post.post.getArchives", // Links to the controller method
      config: {
        auth: false, // Set to false for public access, or use your middleware
      },
    },
  ],
};
