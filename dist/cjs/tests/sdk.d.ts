import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    JSONObject: any;
};
export declare type Block = {
    __typename?: 'Block';
    data?: Maybe<Scalars['JSONObject']>;
    id?: Maybe<Scalars['String']>;
    type?: Maybe<Scalars['String']>;
};
export declare type BlockInput = {
    data?: InputMaybe<Scalars['JSONObject']>;
    id?: InputMaybe<Scalars['String']>;
    type?: InputMaybe<Scalars['String']>;
};
export declare type Editor = {
    __typename?: 'Editor';
    blocks?: Maybe<Array<Maybe<Block>>>;
    time?: Maybe<Scalars['Float']>;
    version?: Maybe<Scalars['String']>;
};
export declare type EditorInput = {
    blocks?: InputMaybe<Array<InputMaybe<BlockInput>>>;
    time?: InputMaybe<Scalars['Float']>;
    version?: InputMaybe<Scalars['String']>;
};
export declare type ListQueryInput = {
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
export declare type Mutation = {
    __typename?: 'Mutation';
    addTemplate?: Maybe<Template>;
    addUser?: Maybe<User>;
    deleteTemplate?: Maybe<Template>;
    deleteUser?: Maybe<User>;
    editTemplate?: Maybe<Template>;
    editUser?: Maybe<User>;
};
export declare type MutationAddTemplateArgs = {
    data?: InputMaybe<TemplateInput>;
};
export declare type MutationAddUserArgs = {
    data?: InputMaybe<UserInput>;
};
export declare type MutationDeleteTemplateArgs = {
    id?: InputMaybe<Scalars['String']>;
};
export declare type MutationDeleteUserArgs = {
    id?: InputMaybe<Scalars['String']>;
};
export declare type MutationEditTemplateArgs = {
    data?: InputMaybe<TemplateInput>;
    id?: InputMaybe<Scalars['String']>;
};
export declare type MutationEditUserArgs = {
    data?: InputMaybe<UserInput>;
    id?: InputMaybe<Scalars['String']>;
};
export declare type Query = {
    __typename?: 'Query';
    template?: Maybe<Template>;
    templates?: Maybe<Array<Template>>;
    user?: Maybe<User>;
    users?: Maybe<Array<User>>;
};
export declare type QueryTemplateArgs = {
    id?: InputMaybe<Scalars['String']>;
};
export declare type QueryTemplatesArgs = {
    data?: InputMaybe<ListQueryInput>;
};
export declare type QueryUserArgs = {
    id?: InputMaybe<Scalars['String']>;
};
export declare type QueryUsersArgs = {
    data?: InputMaybe<ListQueryInput>;
};
export declare type Template = {
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
export declare type TemplateInput = {
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
export declare type User = {
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
export declare type UserInput = {
    email?: InputMaybe<Scalars['String']>;
    firstName?: InputMaybe<Scalars['String']>;
    lastName?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
    photo?: InputMaybe<Scalars['String']>;
    tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
    type?: InputMaybe<Scalars['String']>;
};
export declare type AddTemplateMutationVariables = Exact<{
    data: TemplateInput;
}>;
export declare type AddTemplateMutation = {
    __typename?: 'Mutation';
    addTemplate?: {
        __typename?: 'Template';
        id?: string | null | undefined;
    } | null | undefined;
};
export declare type DeleteTemplateMutationVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type DeleteTemplateMutation = {
    __typename?: 'Mutation';
    deleteTemplate?: {
        __typename?: 'Template';
        id?: string | null | undefined;
    } | null | undefined;
};
export declare type EditTemplateMutationVariables = Exact<{
    id: Scalars['String'];
    data: TemplateInput;
}>;
export declare type EditTemplateMutation = {
    __typename?: 'Mutation';
    editTemplate?: {
        __typename?: 'Template';
        id?: string | null | undefined;
    } | null | undefined;
};
export declare type FindTemplateQueryVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type FindTemplateQuery = {
    __typename?: 'Query';
    template?: {
        __typename?: 'Template';
        id?: string | null | undefined;
        tags?: Array<string | null | undefined> | null | undefined;
        description?: string | null | undefined;
        subject?: string | null | undefined;
        type?: string | null | undefined;
        html?: string | null | undefined;
        css?: string | null | undefined;
        text?: string | null | undefined;
        amp?: string | null | undefined;
        partial?: boolean | null | undefined;
        prerender?: boolean | null | undefined;
        sampleData?: any | null | undefined;
        createdAt?: string | null | undefined;
        editor?: {
            __typename?: 'Editor';
            time?: number | null | undefined;
            version?: string | null | undefined;
            blocks?: Array<{
                __typename?: 'Block';
                data?: any | null | undefined;
                type?: string | null | undefined;
            } | null | undefined> | null | undefined;
        } | null | undefined;
    } | null | undefined;
};
export declare type ListTemplatesQueryVariables = Exact<{
    data: ListQueryInput;
    withHtml: Scalars['Boolean'];
}>;
export declare type ListTemplatesQuery = {
    __typename?: 'Query';
    templates?: Array<{
        __typename?: 'Template';
        id?: string | null | undefined;
        description?: string | null | undefined;
        subject?: string | null | undefined;
        type?: string | null | undefined;
        text?: string | null | undefined;
        html?: string | null | undefined;
        tags?: Array<string | null | undefined> | null | undefined;
        partial?: boolean | null | undefined;
        createdAt?: string | null | undefined;
    }> | null | undefined;
};
export declare const AddTemplateDocument: import("graphql/language/ast").DocumentNode;
export declare const DeleteTemplateDocument: import("graphql/language/ast").DocumentNode;
export declare const EditTemplateDocument: import("graphql/language/ast").DocumentNode;
export declare const FindTemplateDocument: import("graphql/language/ast").DocumentNode;
export declare const ListTemplatesDocument: import("graphql/language/ast").DocumentNode;
export declare type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;
export declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    addTemplate(variables: AddTemplateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddTemplateMutation>;
    deleteTemplate(variables: DeleteTemplateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTemplateMutation>;
    editTemplate(variables: EditTemplateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EditTemplateMutation>;
    findTemplate(variables: FindTemplateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindTemplateQuery>;
    listTemplates(variables: ListTemplatesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ListTemplatesQuery>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
