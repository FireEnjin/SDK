export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONObject: any;
};

export type Block = {
  __typename?: 'Block';
  data?: Maybe<Scalars['JSONObject']>;
  id?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BlockInput = {
  data?: InputMaybe<Scalars['JSONObject']>;
  id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Editor = {
  __typename?: 'Editor';
  blocks?: Maybe<Array<Maybe<Block>>>;
  time?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['String']>;
};

export type EditorInput = {
  blocks?: InputMaybe<Array<InputMaybe<BlockInput>>>;
  time?: InputMaybe<Scalars['Float']>;
  version?: InputMaybe<Scalars['String']>;
};

export type ListQueryInput = {
  back?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  next?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Float']>;
  query?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  whereArrayContains?: InputMaybe<Scalars['JSONObject']>;
  whereArrayContainsAny?: InputMaybe<Scalars['JSONObject']>;
  whereEqual?: InputMaybe<Scalars['JSONObject']>;
  whereGreaterThan?: InputMaybe<Scalars['JSONObject']>;
  whereGreaterThanOrEqual?: InputMaybe<Scalars['JSONObject']>;
  whereIn?: InputMaybe<Scalars['JSONObject']>;
  whereLessThan?: InputMaybe<Scalars['JSONObject']>;
  whereLessThanOrEqual?: InputMaybe<Scalars['JSONObject']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTemplate?: Maybe<Template>;
  addUser?: Maybe<User>;
  deleteTemplate?: Maybe<Template>;
  deleteUser?: Maybe<User>;
  editTemplate?: Maybe<Template>;
  editUser?: Maybe<User>;
};


export type MutationAddTemplateArgs = {
  data?: InputMaybe<TemplateInput>;
};


export type MutationAddUserArgs = {
  data?: InputMaybe<UserInput>;
};


export type MutationDeleteTemplateArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationEditTemplateArgs = {
  data?: InputMaybe<TemplateInput>;
  id?: InputMaybe<Scalars['String']>;
};


export type MutationEditUserArgs = {
  data?: InputMaybe<UserInput>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  template?: Maybe<Template>;
  templates?: Maybe<Array<Template>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryTemplateArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryTemplatesArgs = {
  data?: InputMaybe<ListQueryInput>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryUsersArgs = {
  data?: InputMaybe<ListQueryInput>;
};

export type Template = {
  __typename?: 'Template';
  amp?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  css?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editor?: Maybe<Editor>;
  html?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  partial?: Maybe<Scalars['Boolean']>;
  prerender?: Maybe<Scalars['Boolean']>;
  sampleData?: Maybe<Scalars['JSONObject']>;
  subject?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
};

export type TemplateInput = {
  amp?: InputMaybe<Scalars['String']>;
  css?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  editor?: InputMaybe<EditorInput>;
  html?: InputMaybe<Scalars['String']>;
  partial?: InputMaybe<Scalars['Boolean']>;
  prerender?: InputMaybe<Scalars['Boolean']>;
  sampleData?: InputMaybe<Scalars['JSONObject']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  lastOnline?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<User>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  type?: InputMaybe<Scalars['String']>;
};
