import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';


export const EmailTemplate = ({
	body,
}) => (
	<Html>
		<Head />
		<Preview>
			The Ecommerce Platform For Yout Digital Products search now for your future
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src='https://res.cloudinary.com/dlvbarkgd/image/upload/v1742503752/flutter_app_development_2d54602572.webp'
					width="420"
					height="300"
					alt="Koala"
					style={logo}
				/>
				<Text style={paragraph}>Hi {body.fullName},</Text>
				<Text style={paragraph}>
					Thank you purchasing on educational courses  Ecommerce. Click on Below download button to download the all digital content
				</Text>
				<Section style={btnContainer}>
					<Button pX={12} pY={12}
						style={{
							padding: 5,
							paddingLeft: 10,
							paddingRight: 10,


						}}
						href="https://res.cloudinary.com/dlvbarkgd/image/upload/v1742502384/thumbnail_nextjs_6c99402fd6.png">
						Download
					</Button>
				</Section>
				<Text style={paragraph}>
					Best,
					<br />
					The Sleem Tech team
				</Text>
				<Hr style={hr} />
				<Text style={footer}>Subscribe to Ali Sleem</Text>
			</Container>
		</Body>
	</Html>
);


const main = {
	backgroundColor: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: '0 auto',
	padding: '20px 0 48px',
};

const logo = {
	margin: '0 auto',
};

const paragraph = {
	fontSize: '16px',
	lineHeight: '26px',
};

const btnContainer = {
	textAlign: 'center',
};

const button = {
	backgroundColor: '#5F51E8',
	borderRadius: '3px',
	color: '#fff',
	fontSize: '16px',
	textDecoration: 'none',
	textAlign: 'center',
	display: 'block',
};

const hr = {
	borderColor: '#cccccc',
	margin: '20px 0',
};

const footer = {
	color: '#8898aa',
	fontSize: '12px',
};