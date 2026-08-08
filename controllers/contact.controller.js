import contactService from "../services/contact.service.js";
import sectionService from "../services/section.service.js";

const getContact = async(req, res) => {
  const data = await contactService.getContactPage();
  const contactForm = await sectionService.getContactForm();
  const quote = await sectionService.getQuote();
  
  res.render('pages/contact', { title: data.title, contactForm, quote, ...data});
}

export default {
  getContact
}