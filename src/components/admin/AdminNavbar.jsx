import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../store/authSlice';  // Import logout action

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  {
    name: 'Manage Tickets',
    href: '/admin/manage-tickets',
  },
  {
    name: 'Manage Machines',
    subMenu: [
      { name: 'Create Machine', href: '/admin/create-machine' },
      { name: 'View All Machines', href: '/admin/view-machines' },
      { name: 'Delete Machine', href: '/admin/delete-machine' },
    ],
  },
  {
    name: 'Manage Users',
    subMenu: [
      { name: 'Create User', href: '/admin/register' },
      { name: 'Create State', href: '/admin/create-state' },
      { name: 'Create City', href: '/admin/create-city' },
      { name: 'Create Centre', href: '/admin/create-centre' },
      { name: 'View Users', href: '/admin/view-users' },
      { name: 'Delete User', href: '/admin/delete-user' },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const [openDropdown, setOpenDropdown] = useState(null); // State to handle desktop dropdown
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null); // State to handle mobile dropdown

  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
    navigate('/login');  // Redirect to login page after logout
  };

  const handleMouseEnter = (name) => setOpenDropdown(name);
  const handleMouseLeave = () => setOpenDropdown(null);

  const handleMobileDropdownToggle = (name, event) => {
    event.preventDefault(); // Prevent default link behavior
    if (mobileOpenDropdown === name) {
      setMobileOpenDropdown(null);  // Close the dropdown if already open
    } else {
      setMobileOpenDropdown(name);  // Open the dropdown if it's closed
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 w-full">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex-grow">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto"
                    src="/logo/vituscare.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:block w-full">
                  <div className="flex space-x-4 justify-center">
                    {adminNavigation.map((item) => {
                      const isActive = location.pathname === item.href; // Check if the current path matches the link's href
                      return item.subMenu ? (
                        <div
                          key={item.name}
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                          className="relative flex items-center"
                        >
                          <button
                            className={classNames(
                              'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium flex items-center'
                            )}
                            aria-haspopup="true"
                          >
                            {item.name}
                          </button>
                          {openDropdown === item.name && (
                            <div className="absolute top-full mt-1 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div className="py-1">
                                {item.subMenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown with Logout button */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden flex-grow">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {adminNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <div key={item.name}>
                    {/* Use Link for navigation and button for submenu toggle */}
                    <Link
                      to={item.href}
                      className={classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium w-full text-left flex justify-between items-center'
                      )}
                    >
                      <span>{item.name}</span>
                      {item.subMenu && (
                        <button
                          onClick={(event) => handleMobileDropdownToggle(item.name, event)}
                          className="text-gray-400 hover:text-gray-300 focus:outline-none"
                        >
                          {mobileOpenDropdown === item.name ? (
                            <ChevronDownIcon className="h-5 w-5" />
                          ) : (
                            <ChevronRightIcon className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </Link>
                    {item.subMenu && mobileOpenDropdown === item.name && (
                      <div className="ml-4 mt-2">
                        {item.subMenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}


// Onclick show submenus

// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import { Fragment, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { logout } from '../../store/authSlice';  // Import logout action

// const adminNavigation = [
//   { name: 'Dashboard', href: '/admin/dashboard' },
//   {
//     name: 'Manage Tickets',
//     href: '/admin/manage-tickets',
//   },
//   {
//     name: 'Manage Machines',
//     subMenu: [
//       { name: 'Create Machine', href: '/admin/create-machine' },
//       { name: 'View All Machines', href: '/admin/view-machines' },
//       { name: 'Delete Machine', href: '/admin/delete-machine' },
//     ],
//   },
//   {
//     name: 'Manage Users',
//     subMenu: [
//       { name: 'Create User', href: '/admin/register' },
//       { name: 'Create State', href: '/admin/create-state' },
//       { name: 'Create City', href: '/admin/create-city' },
//       { name: 'Create Centre', href: '/admin/create-centre' },
//       { name: 'View Users', href: '/admin/view-users' },
//       { name: 'Delete User', href: '/admin/delete-user' },
//     ],
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function AdminNavbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation(); // Get the current path

//   const [openDropdown, setOpenDropdown] = useState(null); // State to track which dropdown is open

//   const handleLogout = () => {
//     dispatch(logout());  // Dispatch logout action
//     navigate('/login');  // Redirect to login page after logout
//   };

//   const toggleDropdown = (name) => {
//     if (openDropdown === name) {
//       setOpenDropdown(null);  // Close dropdown if already open
//     } else {
//       setOpenDropdown(name);  // Open clicked dropdown
//     }
//   };

//   const handleMobileDropdownToggle = (name, event) => {
//     event.preventDefault(); // Prevent default link behavior
//     toggleDropdown(name);
//   };

//   return (
//     <Disclosure as="nav" className="bg-gray-800 w-full">
//       {({ open }) => (
//         <>
//           <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex-grow">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
//                 {/* Mobile menu button */}
//                 <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <img
//                     className="block h-8 w-auto"
//                     src="/logo/vituscare.png"
//                     alt="Your Company"
//                   />
//                 </div>
//                 <div className="hidden md:ml-6 md:block w-full">
//                   <div className="flex space-x-4 justify-center">
//                     {adminNavigation.map((item) => {
//                       const isActive = location.pathname === item.href; // Check if the current path matches the link's href
//                       return (
//                         <div key={item.name} className="relative flex items-center">
//                           <Link
//                             to={item.href || '#'}
//                             className={classNames(
//                               isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                               'rounded-md px-3 py-2 text-sm font-medium flex items-center'
//                             )}
//                             aria-current={isActive ? 'page' : undefined}
//                           >
//                             {item.name}
//                           </Link>
//                           {item.subMenu && (
//                             <button
//                               onClick={() => toggleDropdown(item.name)}
//                               className="ml-2 text-gray-400 hover:text-gray-300 focus:outline-none"
//                             >
//                               {openDropdown === item.name ? (
//                                 <ChevronDownIcon className="h-5 w-5" />
//                               ) : (
//                                 <ChevronRightIcon className="h-5 w-5" />
//                               )}
//                             </button>
//                           )}
//                           {item.subMenu && openDropdown === item.name && (
//                             <div className="absolute top-full mt-1 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                               <div className="py-1">
//                                 {item.subMenu.map((subItem) => (
//                                   <Link
//                                     key={subItem.name}
//                                     to={subItem.href}
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                   >
//                                     {subItem.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 <button
//                   type="button"
//                   className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                 >
//                   <span className="sr-only">View notifications</span>
//                   <BellIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>

//                 {/* Profile dropdown with Logout button */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <Link
//                             to="/profile"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Your Profile
//                           </Link>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <button
//                             onClick={handleLogout}
//                             className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Sign out
//                           </button>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="md:hidden flex-grow">
//             <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
//               {adminNavigation.map((item) => {
//                 const isActive = location.pathname === item.href;
//                 return (
//                   <div key={item.name}>
//                     <Link
//                       to={item.href || '#'}
//                       className={classNames(
//                         isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                         'block rounded-md px-3 py-2 text-base font-medium w-full text-left flex justify-between items-center'
//                       )}
//                     >
//                       <span>{item.name}</span>
//                       {item.subMenu && (
//                         <button
//                           onClick={(event) => handleMobileDropdownToggle(item.name, event)}
//                           className="text-gray-400 hover:text-gray-300 focus:outline-none"
//                         >
//                           {openDropdown === item.name ? (
//                             <ChevronDownIcon className="h-5 w-5" />
//                           ) : (
//                             <ChevronRightIcon className="h-5 w-5" />
//                           )}
//                         </button>
//                       )}
//                     </Link>
//                     {item.subMenu && openDropdown === item.name && (
//                       <div className="ml-4 mt-2">
//                         {item.subMenu.map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             to={subItem.href}
//                             className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
//                           >
//                             {subItem.name}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }
