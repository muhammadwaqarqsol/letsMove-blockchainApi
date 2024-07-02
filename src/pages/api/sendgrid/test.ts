// const sgMail = require('@sendgrid/mail');
// import { NextApiRequest, NextApiResponse } from 'next';
// sgMail.setApiKey('' + process.env.SENDGRID_API_KEY + '');
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   try {
//     // console.log("REQ.BODY", req.body);
//     // const emaildata = {
//     //   ownerId: 2,
//     //   email: 'johndoe.qsols@gmail.com',
//     //   name: 'John Doe',
//     //   projectCount: 1,
//     //   phoneNo: "9234567890123",
//     //   projects: [
//     //     {
//     //       id: 15,
//     //       name: 'XoltanMarketplace',
//     //       ticketCounts: 5,
//     //       inprogressTickets: 1,
//     //       completeTickets: 0,
//     //     },
//     //     {
//     //       id: 25,
//     //       name: 'Start Struck',
//     //       ticketCounts: 12,
//     //       inprogressTickets: 1,
//     //       completeTickets: 11,
//     //     }
//     //   ],
//     // };
//     const emaildata = {
//       ownerId: 2,
//       email: 'johndoe.qsols@gmail.com',
//       name: 'John Doe',
//       projectCount: 1,
//       phoneno: '9234567890123',
//       projects: [
//         {
//           id: 15,
//           name: 'XoltanMarketplace',
//           ticketCounts: 5,
//           inprogressTickets: 1,
//           completeTickets: 0,
//         },
//         {
//           id: 25,
//           name: 'Start Struck',
//           ticketCounts: 12,
//           inprogressTickets: 1,
//           completeTickets: 11,
//         },
//       ],
//     };
//     // const emaildata=
//     //   [
//     //     {id: 55,
//     //   name: 'Flyash',
//     //   ownerName: 'John Doe',
//     //   clientName: 'Fahad',
//     //   ticketCounts: 0,
//     //   inprogressTickets: 0,
//     //   completeTickets: 0}
//     //   ]

//     // const emaildata = {
//     //   type: 'platform-seller',
//     //   usercontent: `<p style="color: #FFFFFF; font-size: 13px;">Admin Wants you to join the ticketing platform as a Seller.</p>`,
//     // };
//     // const clientEmailHTML: string = clientEmailLayout(emaildata);

//     const sendingEmail = await sgMail.send({
//       to: 'muwaqar.qsol@gmail.com', // Your email where you'll receive emails
//       // to:"qsolsali@gmail.com",
//       // from: req.body.email, // your website email address here
//       from: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? process.env.ADMIN_EMAIL,
//       subject: `Platform Invitation`,
//       html: 'clientEmailHTML',
//     });
//     console.log({ clientEmailHTML });
//     return res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error: any) {
//     // console.log(error);
//     return res.status(error.statusCode || 500).json({ error });
//   }
// }
