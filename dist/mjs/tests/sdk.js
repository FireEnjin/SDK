import gql from 'graphql-tag';
export const AddTemplateDocument = gql `
    mutation addTemplate($data: TemplateInput!) {
  addTemplate(data: $data) {
    id
  }
}
    `;
export const DeleteTemplateDocument = gql `
    mutation deleteTemplate($id: String!) {
  deleteTemplate(id: $id) {
    id
  }
}
    `;
export const EditTemplateDocument = gql `
    mutation editTemplate($id: String!, $data: TemplateInput!) {
  editTemplate(id: $id, data: $data) {
    id
  }
}
    `;
export const FindTemplateDocument = gql `
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
export const ListTemplatesDocument = gql `
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
export function getSdk(client, withWrapper = defaultWrapper) {
    return {
        addTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(AddTemplateDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'addTemplate');
        },
        deleteTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(DeleteTemplateDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'deleteTemplate');
        },
        editTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(EditTemplateDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'editTemplate');
        },
        findTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(FindTemplateDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'findTemplate');
        },
        listTemplates(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(ListTemplatesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'listTemplates');
        }
    };
}
