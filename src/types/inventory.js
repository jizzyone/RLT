export const INVENTORY_SIZE = 15

export const MOCK_ITEMS = [
    {
        id: 1,
        name: 'Зелье здоровья',
        description: 'Восстанавливает 50 очков здоровья',
        image: '/first_item.svg',
        position: 0, // добавляем position для каждого предмета
        quantity: 3
    },
    {
        id: 2,
        name: 'Меч',
        description: 'Обычный железный меч',
        image: '/second_item.svg',
        position: 1,
        quantity: 1
    },
    {
        id: 3,
        name: 'Щит',
        description: 'Деревянный щит',
        image: '/first_item.svg',
        position: 2,
        quantity: 1
    },
    {
        id: 4,
        name: 'Лук',
        description: 'Эльфийский лук',
        image: '/second_item.svg',
        position: 3,
        quantity: 1
    },
    {
        id: 5,
        name: 'Стрелы',
        description: 'Колчан стрел',
        image: '/first_item.svg',
        position: 4,
        quantity: 40
    },
    {
        id: 6,
        name: 'Зелье маны',
        description: 'Восстанавливает 30 очков маны',
        image: '/second_item.svg',
        position: 5,
        quantity: 5
    }
]

console.log('MOCK_ITEMS:', MOCK_ITEMS)