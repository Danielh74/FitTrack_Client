import { Modal } from 'flowbite-react'
import "../styles/Form.scss";

type Props = {
    show: boolean;
    onClose: () => void;
}

const TermsAndConditionsModal = ({ show, onClose }: Props) => {
    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header className='dark:bg-dropDownBg'><span className='text-2xl text-customGold'>Terms of Service</span></Modal.Header>
            <Modal.Body className='dark:bg-dropDownBg p-0 pl-5 py-1'>
                <div className="space-y-6 dark:text-white overflow-auto h-screen">
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>1. Acceptance of Terms</h2>
                        By accessing or using the Website, you confirm that you:
                        <br />
                        1.1 Are at least 18 years old or have reached the age of majority in your jurisdiction.
                        <br />
                        1.2 Have the legal capacity to enter into this agreement.
                        <br />
                        1.3 Agree to abide by all terms set forth in this document.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>2. Registration and Account Responsibilities</h2>
                        2.1 Account Creation:
                        To use our services, you must register an account by providing accurate, complete, and current information, including personal data, measurements, and fitness goals.
                        <br />
                        2.2 User Responsibility:
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.
                        <br />
                        2.3 Eligibility and Accuracy:
                        By submitting information, you certify that all provided data is accurate and up-to-date. False or misleading information may result in account suspension or termination.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>3. Services Provided</h2>
                        3.1 Upon registration and submission of your data, a qualified professional trainer (“the Admin”) will create a personalized workout plan and nutritional menu tailored to your goals.
                        <br />
                        3.2 The services provided are for informational and educational purposes only and should not be interpreted as medical advice. Always consult with a healthcare provider before starting any fitness or nutrition plan.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>4. User Obligations</h2>
                        4.1 Health Disclaimer:
                        By using the Website, you acknowledge that you are in sufficient health to participate in fitness and nutritional programs. You agree to assume full responsibility for any risks associated with the implementation of the plans provided.
                        <br />
                        4.2 Compliance:
                        Users are required to follow applicable laws and avoid using the Website for illegal, harmful, or fraudulent purposes.
                        <br />
                        4.3 Prohibited Conduct:
                        You agree not to:
                        <ul className='list-disc'>
                            <li className='list-inside'>Share your account with others.</li>
                            <li className='list-inside'>Copy, reproduce, or distribute the materials provided to you.</li>
                            <li className='list-inside'>Attempt to interfere with the Website’s security or functionality.</li>
                        </ul>
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>5. Payments and Refunds</h2>
                        5.1 Payment Terms:
                        Some services offered by the Website may require payment. By making a payment, you agree to the stated pricing and billing terms.
                        <br />
                        5.2 Refund Policy:
                        Refunds, if applicable, will be issued at the sole discretion of the Website admin. Certain services may be non-refundable. Details will be outlined during the purchase process.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>6. Intellectual Property</h2>
                        6.1 All content, including workout plans, nutritional menus, and Website materials, are the exclusive property of [Website Name].
                        <br />
                        6.2 You are granted a limited, non-transferable license to access and use the provided content for personal purposes only. Unauthorized use, copying, or redistribution of the content is strictly prohibited.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>7. Limitation of Liability</h2>
                        7.1 The Website and its Admin shall not be held liable for:
                        <ul className='list-disc'>
                            <li className='list-inside'>Any injuries, illnesses, or adverse outcomes arising from the use of workout or nutritional plans.</li>
                            <li className='list-inside'>Errors or inaccuracies in the information provided by the user.</li>
                            <li className='list-inside'>Technical interruptions or service unavailability.</li>
                        </ul>
                        7.2 In no event shall liability exceed the fees paid by the user for the specific service giving rise to the claim.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>8. Privacy Policy</h2>
                        The collection, use, and protection of your personal information are governed by our Privacy Policy. By registering, you agree to the terms outlined in the Privacy Policy.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>9. Termination</h2>
                        9.1 The Website reserves the right to terminate or suspend your account for violation of these Terms and Conditions.
                        <br />
                        9.2 Upon termination, access to personalized plans and materials will be revoked without refund unless otherwise stated.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>10. Governing Law</h2>
                        These Terms and Conditions are governed by and construed in accordance with the laws of the state of Israel. Any disputes arising from or related to these terms will be subject to the exclusive jurisdiction of the courts in Israel.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>11. Amendments and Modifications</h2>
                        The Website reserves the right to update or revise these Terms and Conditions at any time. Changes will be effective upon posting to the Website. Continued use constitutes acceptance of the revised terms.
                    </p>
                    <p className="text-base leading-relaxed">
                        <h2 className='font-medium'>12. Contact Information</h2>
                        For questions or concerns regarding these Terms and Conditions, please contact us at:
                        Email: a@gmail.com
                    </p>
                    <p className="text-base leading-relaxed">
                        By registering on the Website, you affirm that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className='dark:bg-dropDownBg'>
                <button onClick={onClose} className='w-1/6 save-button'>
                    Got it!
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default TermsAndConditionsModal