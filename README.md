"# Blog Platform Readme File"

<!-- Project Overview -->

This project is a blog platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows users to sign up, log in, and perform various blog-related activities such as creating, editing, and deleting blogs. Additionally, users can view and comment on blogs from other users. Authentication is implemented using JWT (JSON Web Token) to protect user data and routes.

<!-- ------------------------------------------------------------------ -->

 <!-- Table of Contents -->

1. Getting Started
2. Backend Instructions
3. Frontend Instructions
4. Features (Signup, Login, Add-Blog, Edit-Blog, Delete-Blog, View-All-Blogs, My-Blogs-Section)
5. Models (User-Model, Blog-Model)
6. Middleware
7. Responsive Design
8. Error Handling
   <!-- ------------------------------------------------------------------ -->

<!-- Getting Started -->

<!-- Backend Setup: -->

1. Run npm install to install all necessary packages.
2. Start the backend server using (nodemon index.js or npm start)
3. Ensure that MongoDB is connected successfully to proceed with route handling.

<!-- Frontend Setup: -->

1. Navigate to the frontend directory in your terminal.
2. Run the following command to start the React application (npm start)

   <!-- ------------------------------------------------------------------ -->

<!-- Backend Instructions -->

<!-- Entry Point: -->

1. The backend code execution starts from index.js.
2. Upon successful connection to MongoDB, you can access the defined routes for user authentication and blog management.

<!-- JWT Authentication: -->

3. After a successful login, JWT is used to authenticate and authorize users.
4. Sessions expire after 1 Hour, and users are redirected to the login page upon expiration.

 <!-- RESTful API: -->

1. The backend implements various API endpoints for user signup, login, blog creation, and blog management (CRUD operations).
<!-- ------------------------------------------------------------------ -->

<!-- Frontend Instructions -->

<!-- Navigation: -->

1. The frontend includes routes for signup, login, blog creation, and viewing all blogs.
2. After successful login, users are automatically redirected to the Blog Manager section.

<!-- Toast Notifications: -->

1. Toast notifications are used for various user actions such as login success, errors, and CRUD operations on blogs.
<!-- ------------------------------------------------------------------ -->

<!-- Features -->

<!-- Signup -->

1. Path: /signupUser
2. Description: Users must fill out a registration form with valid credentials (username, email, and password) to sign up.
3. Validations: All fields are required.
4. The email must be unique and in a valid format.

<!-- Login -->

1. Path: /loginUser
2. Description: Users can log in by providing valid credentials (email and password).
3. JWT Authentication: A valid token is generated after successful login and is stored in localStorage.
4. Token expiration is set to 1 Hour, after which users are redirected to the login page.

 <!-- Add Blog -->

1. Path: /createBlog
2. Description: After logging in, users can create a new blog by providing a title and content.
3. Blog Fields: Title (required), Content (required)

<!-- Edit Blog -->

1. Path: /updateBlog/:id
2. Description: Users can edit their existing blogs by modifying the title and content.
3. Restriction: Users can only edit blogs they have created.

<!-- Delete Blog -->

1. Path: /deleteBlog/:id
2. Description: Users can delete their own blogs.
3. Restriction: Users are restricted from deleting blogs created by other users.

<!-- View All Blogs -->

1. Path: /getAllBlogs
2. Description: Users can view all blogs created by themselves and others.
3. Features: Users can comment on any blog, Only the author of a blog can delete it.

<!-- My Blogs Section -->

1. Path: /getBlogsAgainstUser
2. Description: This section displays all blogs created by the logged-in user, providing options to edit and delete them.
<!-- ------------------------------------------------------------------ -->

<!-- Responsive Design -->

1. The application is fully responsive and works on both web and mobile devices.
2. Bootstrap is used for styling and ensuring the UI adapts to different screen sizes.
<!-- ------------------------------------------------------------------ -->

<!-- Error Handling -->

1.  Frontend: Toast notifications are used to alert users of any errors, such as invalid credentials or unauthorized actions.
2.  Backend: Error messages are sent in response to invalid requests, and proper status codes are used (e.g., 401 for unauthorized, 400 for bad requests).
    <!-- ------------------------------------------------------------------ -->

                                        <!-- ---------- THANK-YOU ---------- -->
