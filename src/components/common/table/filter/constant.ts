// project table filter
export const projectFilters = [
  {
    Icon: 'fal fa-chevron-down',
    text: 'Search',
    filtername: 'searchQuery',
    type: 'text',
  },

  {
    Icon: 'fal fa-chevron-down',
    text: 'Material Type',
    filtername: 'material_type',
    type: 'select',

    filter: [
      {
        name: 'dump',
        value: 'dump',
      },
      {
        name: 'sand',
        value: 'sand',
      },
    ],
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Truck Capacity',
    filtername: 'truck_cap',
    type: 'select',

    filter: [
      {
        name: 'half',
        value: 'half',
      },
      {
        name: 'full',
        value: 'full',
      },
    ],
  },

  {
    Icon: 'fal fa-chevron-down',
    text: 'Start Date',
    filtername: 'startDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Delivery Date',
    filtername: 'endDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Clear Filter',
    filtername: 'Clear',
  },
];

// ticket table filters
export const projectTicketFilters = [
  {
    Icon: 'fal fa-chevron-down',
    text: 'Search',
    filtername: 'searchQuery',
    type: 'text',
  },

  {
    Icon: 'fal fa-chevron-down',
    text: 'Ticket Status',
    filtername: 'status',
    type: 'select',

    filter: [
      {
        name: 'hold',
        value: 'hold',
      },
      {
        name: 'pending',
        value: 'pending',
      },
      {
        name: 'completed',
        value: 'completed',
      },
      {
        name: 'rejected',
        value: 'rejected',
      },
    ],
  },

  {
    Icon: 'fal fa-chevron-down',
    text: 'Start Date',
    filtername: 'startDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'End Date',
    filtername: 'endDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Clear Filter',
    filtername: 'Clear',
  },
];
// user table  filters

export const userFilters = [
  {
    Icon: 'fal fa-chevron-down',
    text: 'Search',
    filtername: 'searchQuery',
    type: 'text',
  },

  {
    Icon: 'fal fa-chevron-down',
    text: 'Start Date',
    filtername: 'startDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Delivery Date',
    filtername: 'endDate',
    type: 'date',
  },
  {
    Icon: 'fal fa-chevron-down',
    text: 'Clear Filter',
    filtername: 'Clear',
  },
];
