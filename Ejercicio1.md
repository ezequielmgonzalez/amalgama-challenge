# Ejercicio 1 - Componentes

1. Problemas del componente:
    1. Primero realiza un _.map()_ de unos contactos que le viene por props para ajustar sus fields acorde a lo que necesita esta pantalla. Esta funcion puede ser util en el resto de la app por lo tanto se podria abstraer esa logica y llamar a esa funcion cuando sea necesaria. En este caso, yo crearia una funcion y la guardaria en otra carpeta (por ejemplo /utils) y la exportaria para que sea accesible por cualquier otra funcion o component que la necesite. Una funcion `parseContactsToDisplay()` que se encargue de esto. Esto tambien es bueno para que el componente solo tenga el trabajo de realizar el renderizado de la _ContactsScreen_ (como asi lo indica su nombre).
    2. En cuanto al renderizado, podemos ver que empieza por una _Navbar_. Aca suceden dos cuestiones: - La _Navbar_ deberia ser accesible por el resto de las screens, por lo tanto lo recomendable seria abstraerlo y tenerlo en un layout para no tener que repetir este codigo en cada screen que vaya a necesitar de esta _Navbar_. - Si en algun momento se quiere modificar la _Navbar_, habria que modifcar el codigo de cada componente que la usa, por lo tanto habria que cambiar tambien _ContactsScreen_.
       Solucion: Abstraer el componente _Navbar_ y usarlo en _ContactScreen_ o en el layout. (Aca reemplazaria en el html para para que div sea section).
    3. Si por alguna razon se quiere modificar el titulo, el emoji del mismo o incluso que tenga mas elementos, habria que tocar el codigo de _ContactsScreen_ para eso. Este se puede abstraer tambien utilizando un componente propio como _ContactsScreenHeader_ o tambien se podria modificar las props para que incluya tilte (e inlcuir este titulo por defecto en caso de que no se envie uno por props).
       Solucion: paso title por props y hago un componente _ContactsScreenHeader_ que es el que se encarga del renderizado del titulo.
    4. La lista que realiza despues para cada contacto la abstraeria en otro componente tambien. Similar al caso anterior, si por alguna razon se quiere cambiar algo de esta lista, habria que buscar en este codigo para cambiarlo. Ademas, puede que alguno de estos componentes se reutilicen. Tambien destaco que falta una key para cada elemento renderizado en este map.
       Solucion: Crearia dos componentes: _ContactsList_ y _ContactCard_. La lista renderiza los contactos pasados por props y renderiza una _ContactCard_ par acada uno. Cada _ContactCard_ tiene su `key={contact.id}`.
    5. Componetizar los sectores de la card por el mismo problema presentado en puntos anteriores. Solucion: Tener _ContactHeader_, _ContactDescription_ y _ContactFooter_.
    6. A la imagen del avatar le falta un _alt_ para dar mas accesibilidad. Solucion: agregarlo usando el nombre del contacto.

En resumen, el problema más relevante es la poca componetizacion para dividr las tareas del componente, haciendo que el componente tenga mas de una tarea a la vez de que es poco reutilizable para el resto de la app.

2.

```
export const parseContactToDisplay = (contact) => {
	if (!contact) return
	const parsedContact = {
		id: contact.id,
        avatar_url: contact.avatar_url,
        full_name: `${contact.first_name} ${contact.last_name}`,
        company: contact.company,
        details: truncate(contact.details, 100),
        email: contact.email,
        phone_number: `(${contact.phone.area_code}) ${contact.phone.number}`,
        addresses: contact.addresses.map(address => ({
            line_1: address.line_1,
            line_2: address.line_2,
            zip_code: address.zip_code,
            city: findById(cities, address.city_id),
            state: findById(states, address.state_id),
        }))
	}
	return parsedContact
}

export const parseContactsToDisplay = (contacts) => {
    return contacts.map(contact => parseContactToDisplay(contact));
}

export const Navbar = () => {
    return (
        <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/contacts">My Contacts</a></li>
                </ul>
            </nav>
    )
}

export const ContactsScreenHeader = ({ title = "Contacts 👥" }) => {
    return (
        <h1>{title}</h1>
    )
}

export const ContactCardAvatar = ({url, name}) => {
    return (
        <img src={url} alt={`${name}'s avatar`} />
    )
}

export const ContactCardTitle = ({name, company}) => {
	return (
		<h3>{name}</h3> - <h4>{company}</h4>
	)
}

export const ContactCardHeader = ({avatarUrl, name, company}) => {
    return (
        <div>
			<ContactCardAvatar url={avatarUrl} name={name} />
			<ContactCardTitle name={name} company={company} />
    	</div>
    )
}
export const ContactCardAddresses = ({addresses}) => {
	return (
		<>
			{addresses.length > 1
				? <h4>Addresses:</h4>
				: <h4>Address:</h4>
			}
			{addresses.map(address => (
				<ul>
					<li>{address.line_1}</li>
					<li>{address.line_2}</li>
					<li>{address.zip_code}</li>
					<li>{address.city}</li>
					<li>{address.state}</li>
				</ul>
			))}
		</>
	)
}

export const ContactCardBody = ({email, phoneNumber, details, addresses }) => {
	return (
		<>
			<p>{details}</p>
			<ul>
                <li>email: {email}</li>
                <li>phone: {phoneNumber}</li>
                <li>
					<ContactCardAddresses addresses={addresses} />
                </li>
            </ul>
		</>
	)
}

export const ContactCard = ({contact}) => {
    return (
        <div>
           <ContactCardHeader
        		avatarUrl={contact.avatar_url}
				name={contact.full_name}
				company={contact.company}
			/>
            <ContactCardBody
				email={contact.email}
				phoneNumber={contact.phone_number}
				details={contact.details}
				addresses={contact.addresses}
			/>
        </div>
    )
}

export const ContactsList = ({ contacts }) => {
    return (
        <div>
            {contacts.map(contact => (
                    <ContactCard contact={contact} />
                ))}
            </div>
    )
}


const ContactsScreen = ({ contacts, cities, states }) => {
    const contactsToDisplay = parseContactsToDisplay(contacts)

    return (
        <div>
            <Navbar />
            <ContactsScreenHeader />
            <ContactsList contacts={contactsToDisplay} />
        </div>
    )
};
```

3. Con este nuevo codigo se soluciona principalmente el problema de que el componente hacia mas de una cosa y le faltaba mas claridad. Ahora se puede ver que hay varios componentes mas y cada uno es mas independiente, lo cual facilita su re-utilizacion, posible modificacion y aporta mas claridad a cual es la tarea de cada uno.

4. Considerando que no se uso un Layout:

````
const ContactProfileScreen = ({contact}) => {
	const contactToDisplay = parseContactToDisplay(contact)
	retrun (
		<section>
			<Navbar />
			<ContactCard contact={contactToDisplay} />
		</section>

	)
}
```
Si se usara un Layout, seria sin la Navbar.
````
