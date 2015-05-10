AccountsTemplates.configureRoute('signIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});


AccountsTemplates.addFields([
    {
        _id: 'firstName',
        displayName: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        required: true
    },
    {
        _id: 'lastName',
        displayName: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        required: true
    }
]);

