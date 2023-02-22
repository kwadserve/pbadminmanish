module.exports = [
    {
        key: 'home',
        name: 'Dashboard',
        icon: 'home',
        linkParent: '/',
    },
    {
        key: 'master',
        name: 'Masters',
        icon: 'border_color',
        child: [
            {
                key: 'users',
                name: 'Users',
                link: '/app/users',
                icon: 'business'
            },
            {
                key: 'managers',
                name: 'Managers',
                link: '/app/managers',
                icon: 'business'
            },
            {
                key: 'operators',
                name: 'Operators',
                link: '/app/operators',
                icon: 'business'
            },
            {
                key: 'types_of_vehicle',
                name: 'Types of Vehicle',
                link: '/app/types-of-vehicle',
                icon: 'business'
            },
            {
                key: 'places',
                name: 'Places',
                link: '/app/places',
                icon: 'business'
            },
            {
                key: 'area',
                name: 'Area',
                link: '/app/area',
                icon: 'business'
            },
            {
                key: 'parkings',
                name: 'Parkings',
                link: '/app/parkings',
                icon: 'business'
            },
        ]
    },
    {
        key: 'assign_parking',
        name: 'Assign Parking',
        icon: 'add_box',
        linkParent: '/app/assign-parking',
    },
    {
        key: 'booked_parkings',
        name: 'Booked Parkings',
        icon: 'local_parking',
        linkParent: '/app/booked-parkings',
    },
    {
        key: 'technical_support',
        name: 'Technical Support',
        icon: 'computer',
        linkParent: '/app/technical-support',
    },
    {
        key: 'policies',
        name: 'Policies',
        icon: 'security',
        linkParent: '/app/policies',
    },
    {
        key: 'refund_requests',
        name: 'Refund Requests',
        icon: 'refresh',
        linkParent: '/app/refund-requests',
    },
    {
        key: 'help',
        name: '24X7 Help & Support',
        icon: 'help',
        linkParent: '/app/help',
    }
]