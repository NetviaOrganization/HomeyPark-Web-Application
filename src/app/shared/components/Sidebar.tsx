import { Menu } from 'primereact/menu'
import { MenuItem } from 'primereact/menuitem'
import { classNames } from 'primereact/utils'
import { NavLink } from 'react-router-dom' // Fix the import

const Sidebar = () => {
  const items: MenuItem[] = [
    {
      label: 'Explora',
      items: [
        {
          label: 'Buscar un garage',
          template: (item) => (
            <NavLink
              className={({ isActive }) =>
                classNames('px-5 py-3 block w-full text-sm', {
                  'bg-gray-100': isActive,
                })
              }
              to="/find-your-parking"
            >
              {item.label}
            </NavLink>
          ),
        },
        {
          label: 'Mis reservas',
          template: (item) => (
            <NavLink
              className={({ isActive }) =>
                classNames('px-5 py-3 block w-full text-sm', {
                  'bg-gray-100': isActive,
                })
              }
              to="/my-reservations"
            >
              {item.label}
            </NavLink>
          ),
        },
      ],
    },
    {
      label: 'Renta un garaje',
      items: [
        {
          label: 'Mis garages',
          template: (item) => (
            <NavLink
              to="/my-garages"
              className={({ isActive }) =>
                classNames('px-5 py-3 block w-full text-sm', {
                  'bg-gray-100': isActive,
                })
              }
            >
              {item.label}
            </NavLink>
          ),
        },
        {
          label: 'Reservas entrantes',
          template: (item) => (
            <NavLink
              to="/incoming-reservations"
              className={({ isActive }) =>
                classNames('px-5 py-3 block w-full text-sm', {
                  'bg-gray-100': isActive,
                })
              }
            >
              {item.label}
            </NavLink>
          ),
        },
      ],
    },
  ]

  return (
    <div className="max-w-72 w-full border-r-slate-100 border-r px-6 py-6 flex flex-col">
      <Menu model={items} className="w-full text-sm" />
    </div>
  )
}

export default Sidebar
