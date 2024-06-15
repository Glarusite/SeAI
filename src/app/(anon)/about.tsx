import { Paragraph, Title } from "react-native-paper";

import AppScrollView from "@src/components/app/app-scroll-view";

export default function AboutPage() {
  return (
    <AppScrollView>
      <Paragraph>
        At SeAI, we are navigating the seas of innovation to redefine the future of the maritime industry. Our mission
        is to bridge the gap between crew, manning agents, and training centers by delivering a cutting-edge platform
        that offers a sea change in the way the industry operates.
      </Paragraph>
      <Title>Our Vision</Title>
      <Paragraph>
        SeAI&apos;s vision is to create a connected ecosystem where maritime professionals can seamlessly access their
        documents, training, and communication tools from a single, user-friendly platform. We envision a future where
        the maritime industry is empowered by advanced technology to operate more efficiently, safely, and sustainably.
      </Paragraph>
    </AppScrollView>
  );
}
