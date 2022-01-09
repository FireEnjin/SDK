"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.ListTemplatesDocument = exports.FindTemplateDocument = exports.EditTemplateDocument = exports.DeleteTemplateDocument = exports.AddTemplateDocument = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.AddTemplateDocument = (0, graphql_tag_1.default) `
    mutation addTemplate($data: TemplateInput!) {
  addTemplate(data: $data) {
    id
  }
}
    `;
exports.DeleteTemplateDocument = (0, graphql_tag_1.default) `
    mutation deleteTemplate($id: String!) {
  deleteTemplate(id: $id) {
    id
  }
}
    `;
exports.EditTemplateDocument = (0, graphql_tag_1.default) `
    mutation editTemplate($id: String!, $data: TemplateInput!) {
  editTemplate(id: $id, data: $data) {
    id
  }
}
    `;
exports.FindTemplateDocument = (0, graphql_tag_1.default) `
    query findTemplate($id: String!) {
  template(id: $id) {
    id
    editor {
      time
      version
      blocks {
        data
        type
      }
    }
    tags
    description
    subject
    type
    html
    css
    text
    amp
    partial
    prerender
    sampleData
    createdAt
  }
}
    `;
exports.ListTemplatesDocument = (0, graphql_tag_1.default) `
    query listTemplates($data: ListQueryInput!, $withHtml: Boolean!) {
  templates(data: $data) {
    id
    description
    subject
    type
    text
    html @include(if: $withHtml)
    tags
    partial
    createdAt
  }
}
    `;
const defaultWrapper = (action, _operationName) => action();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        addTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.AddTemplateDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'addTemplate');
        },
        deleteTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.DeleteTemplateDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'deleteTemplate');
        },
        editTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.EditTemplateDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'editTemplate');
        },
        findTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.FindTemplateDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'findTemplate');
        },
        listTemplates(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(exports.ListTemplatesDocument, variables, Object.assign(Object.assign({}, requestHeaders), wrappedRequestHeaders)), 'listTemplates');
        }
    };
}
exports.getSdk = getSdk;
