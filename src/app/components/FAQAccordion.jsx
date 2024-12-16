import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQAccordion = () => {
  return (
    <section className="flex text-black flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>
      <Accordion type="single" collapsible className="w-full max-w-lg">
        <AccordionItem value="item-1">
          <AccordionTrigger>Hvornår er det muligt at ankomme til festivalen?</AccordionTrigger>
          <AccordionContent>Festivalen åbner onsdag kl. 12:00, hvor du har mulighed for at sætte dit telt op.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Er der offentlig transport i nærheden af festivalen?</AccordionTrigger>
          <AccordionContent>Ja, du kan tage enten toget til stationen og gå derfra til festivalen, eller tage bus 202 fra stationen, som kører dig hen til festivalpladsens private busstoppested.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Er det muligt at oplade sin telefon på festivalen?</AccordionTrigger>
          <AccordionContent>Ja, du kan benytte vores offentlige opladestandere, som befinder sig rundt omkring på festivalpladsen. Spørg endelig en medarbejder, hvis du er i tvivl om, hvor du kan finde dem.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Hvad skal jeg gøre, hvis jeg fortryder min billet?</AccordionTrigger>
          <AccordionContent>Hvis du står i den ærgerlige situation og vil fortryde din billet, skal du kontakte os på DuVilForTrydeDet.com.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQAccordion;
