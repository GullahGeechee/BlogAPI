# BlogAPI Project

#### Users are abler to create an account authorize with schema. User can also post delete create posts via ID. User receives custom token. Hash protected password incorporated. Specific email and password required.

## TECH STACK 

## Server: Node, Express
## Database: MongoDB
## Tools: MongoDB , Moongoose

## ENV VARIABLES

#### SALT
#### SECRET_KEY
#### PORT=

## Schemas

### USER SCHEMA

####  - username: string, required
####  - email: string, required
####  - birthday: date, required
####  - age: number
####  - password: string, required


### BLOG SCHEMA
 
####   - created_by: string, required
####   - created_at: date, required
####   - blog_title: string, required
####   - blog_content: string, required
####   - private: boolean, required

## MIDDLEWARE

#### Verify Token and Validations
#### Requires specific password access to blogs

## ROUTES ENDPOINTS 

#### AUTH('/auth') Authorization or user/blog
#### BLOG('/blogs') creates posts CRUD
#### USERS('/users') Creates user CRUD


## RUN LOCALLY 

## Git Clone 

#### gh repo clone GullahGeechee/BlogAPI


### Install dependencies  

#### - cd blopAPI

### Install dependencies 

npm init -y
npm i:
 
#### dotenv
#### bcrypt
#### express
#### helmet
#### jsonwebtoken
#### mongoose
#### morgan 







