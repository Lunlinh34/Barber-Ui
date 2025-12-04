import emailjs from '@emailjs/browser';

export const sendAutoEmail = (customer) => {
  return emailjs.send(
    'service_dl0jte9', // Service ID
    'template_3h404ix', // Template ID
    {
      email: customer.email,                    // Trùng với {{email}} trong template
      customer_name: `${customer.firstName} ${customer.lastName}`,
      date: customer.date,
      time: customer.time,
      store: customer.store,
    },
    'imqjdqHJVEy1Tte4i' // Public Key (User ID)
  );
};
