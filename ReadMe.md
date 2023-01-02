This is an API for a blog app

REQUIREMENTS
1. User should have a first name, last name, email and password.
2. User should be able to signup and signin into the blog app.
3. User will sign in using JWT strategy and token expires in 1 hour.
4. Blogs are only created by signed in users
5. Blog default state is draft. 
6. Blog owners should be able to update blog to published state, edit and delete blog in any state.
7. Blogs are paginated to 20 blogs per page and searchable by author, title and tags.
8. Reading_time is calculated for each blog. 

SETUP
1. Install dependencies
2. run `npm run dev`>> to run index.js




### user model
| field  |  data_type | constraints  |
|---|---|---|
|  firstname | string  |  required |
|  lastname  |  string |  required |
|  email     | string  |  required |
|  password |   string |  required  |



### blog model
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description | string  |  required |
|  author  |  string |  required  |
|  state   | string  |  required |
|  read_count |   number |  required  |
|  reading_time |  string |  required |
|  body |  string |  required |
|  tags |  string |  required |

### user-signup

- Route: /user/signup
- Method: POST
- Body: 
``
{
  "first_name": "Elizabeth",
  "last_name": "Borokinni",
  "email": "Elizabeth@gmail.com",
  "password": "Eli"
}
``

### user-login 

- Route: /user/login
- Method: POST
- Body: 
``
{
  "email": "Elizabeth@gmail.com",
  "password": "Eli"  
}
``
### BLOG-MODEL

### Create blog

- Route: /blog/create
- Method: POST
- Header - Authorization: Bearer {token}

---

### Get blog >> get all blogs

- Route: /blog/get
- Method: GET

---

### Get blog by id >> get a particular blog

- Route: /blog/get/:id
- Method: GET

### Update blog by id

- Route: /blog/update/:id
- Method: PUT
- Header - Authorization: Bearer {token}

---

### Delete blog by id

- Route: /blog/delete/:id
- Method: DELETE
- Header - Authorization: Bearer {token}

---

### Get user blog 

- Route: /blog/userblog
- Method: GET
- Header - Authorization: Bearer {token}

---

###Rate Limiting

- This is to limit the number of times a request is made to the server. This is to enable proper functioning of the server  

---
### Contributor
- ELIZABETH BOROKINNI