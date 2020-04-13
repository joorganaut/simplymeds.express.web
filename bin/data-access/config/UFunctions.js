let UFunctions = [{
        Name : 'Store',
        Details: [{
                Name : 'Cart',
                Details: {
                    Url: '/Cart',
                    FGroup: 'Store'
                }
            },
            {
                Name : 'CheckOut',
                Details: {
                    Url: '/Checkout',
                    FGroup: 'Store'
                }
            },
            {
                Name : 'Store',
                Details: {
                    Url: '/Store',
                    FGroup: 'Store'
                }
            },
        ]
    },
    {
        Name : 'Patient',
        Details: [{
            Name : 'AddPatient',
            Details: {
                    Url: '/Patient/Add',
                    FGroup: 'Patient'
                },
            },
            {
                Name : 'EditPatient',
                Details: {
                    Url: '/Patient/Edit',
                    FGroup: 'Patient'
                }
            },
            {
                Name : 'ViewPatients',
                Details: {
                    Url: '/Patient/View',
                    FGroup: 'Patient'
                }
            },
            {
                Name : 'ViewPatientDetails',
                Details: {
                    Url: '/Patient/ViewDetails',
                    FGroup: 'Patient'
                }
            }
        ]




    }
]
module.exports = UFunctions
