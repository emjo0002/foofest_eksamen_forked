import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/app/ui/accordion";

const FAQAccordion = () => {
  return (
    <section className="flex text-black flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">FAQ</h1>
      <Accordion type="single" collapsible className="w-full max-w-lg mb-16">
        <AccordionItem value="item-1">
          <AccordionTrigger>When is it possible to arrive at the festival?</AccordionTrigger>
          <AccordionContent>The festival opens on Wednesday at 12:00 PM, where you can set up your tent.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Is there public transportation near the festival?</AccordionTrigger>
          <AccordionContent>Yes, you can either take the train to the station and walk from there to the festival, or take bus 202 from the station, which will take you to the festival's private bus stop.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Is it possible to charge your phone at the festival?</AccordionTrigger>
          <AccordionContent>Yes, you can use our public charging stations located around the festival grounds. Feel free to ask a staff member if you are unsure where to find them.</AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What should I do if I want to cancel my ticket?</AccordionTrigger>
          <AccordionContent>If you are in the unfortunate situation of wanting to cancel your ticket, please contact us at DuVilForTrydeDet.com.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQAccordion;
