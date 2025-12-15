import React, { useState } from "react";

import article1 from "../assets/article1.png";
import article2 from "../assets/article2.png";
import article3 from "../assets/article3.png";
import article4 from "../assets/article4.png";
import article5 from "../assets/article5.png";


const articles = [
  {
    id: 1,
    image: article1,
    title: "The Profound Journey: Navigating Pregnancy and Motherhood",

    content: ( 
      <>
        <p className="mb-4">The path to motherhood is one of life's most transformative experiences, beginning with the delicate, nine-month evolution known as pregnancy. Far more than a physical change, this journey is a profound emotional and mental reshaping that prepares a person for the role of a lifetime.</p>
        <h4 className="text-xl font-semibold text-secondary mb-2">The Marvel of Pregnancy</h4>
        <p className="mb-4">Pregnancy is a period defined by anticipation and awe. Every trimester brings its own distinct milestones, from the flutter of the first movements to the intimate ritual of ultrasounds. It is a time when the body performs an extraordinary feat of creation and sustenance. Expectant mothers are often encouraged to prioritize nutrition, rest, and emotional well-being, understanding that the health of the child is inextricably linked to their own self-care. It’s a delicate balance of managing physical discomfort while embracing the incredible power within.</p>
        <h4 className="text-xl font-semibold text-secondary mb-2">The Dawn of Motherhood</h4>
        <p className="mb-4">When pregnancy ends, the journey of motherhood begins. The arrival of a child marks a shift in identity, purpose, and daily routine. The initial period, often characterized by sleepless nights and rapid learning, establishes a deep, primal bond between mother and child. Motherhood quickly teaches resilience, patience, and unconditional love. It is a continuous process of learning to meet the evolving needs of another human being while simultaneously rediscovering one's own capabilities and strength.</p>
        <h4 className="text-xl font-semibold text-secondary mb-2">Embracing the Village</h4>
        <p>A vital component of navigating motherhood successfully is accepting support. The "village" – whether family, friends, partners, or community – plays an essential role in providing practical help and emotional validation. Seeking help is not a sign of weakness, but a recognition that this immense task is best shared. Ultimately, the journey through pregnancy and into motherhood is messy, magical, and deeply personal. It is a continuous evolution that shapes not just the child's future, but the mother's entire world.</p>
      </>
    ),
  },
  {
    id: 2,
    image: article2,
    title: "Nutrition Essentials",

    content: ( <> <p className="mb-4">Pregnancy is a transformative journey, and proper nutrition is the cornerstone of a healthy experience for both the mother and the developing baby. Eating a balanced diet ensures you meet your increased demands for energy and vital nutrients, supporting optimal fetal growth and your own well-being. </p>
        <h4 className="text-xl font-semibold text-secondary mb-2">1. The Power of Prenatal Vitamins and Key Nutrients </h4>
        <p className="mb-4">Even with a perfect diet, it can be challenging to meet all the increased nutritional needs. A high-quality prenatal vitamin, taken daily, is often recommended by healthcare providers to fill these gaps.
•	Folic Acid : This is perhaps the most critical nutrient, especially in the early stages. It helps prevent serious birth defects of the brain and spinal cord. Good sources include fortified cereals, dark leafy greens , beans, peas, and citrus fruits.
•	Iron: Your body needs more iron to make extra blood to supply oxygen to the fetus. This helps prevent iron-deficiency anemia in the mother. Choose lean red meat, poultry, fish, iron-fortified cereals, beans, and lentils. 
•	Calcium and Vitamin D: Calcium builds strong bones and teeth for the baby, and Vitamin D helps the body absorb that calcium. Consume milk, yogurt, hard cheese, and calcium-fortified products. Fatty fish and fortified milk are good sources of Vitamin D.
•	Protein: Essential for the growth of fetal tissue, including the brain. Ensure you get enough from lean meat, poultry, fish, eggs, beans, peas, nuts, seeds, and dairy.
•	Iodine: Crucial for the baby's neurocognitive development and the mother's thyroid function. Look for iodized salt, seafood, dairy, and eggs.
•	Omega-3 Fatty Acid: This healthy fat supports the healthy development of the baby's brain and eyes. It is often consumed through supplements or low-mercury fatty fish like salmon.
 </p>
        <h4 className="text-xl font-semibold text-secondary mb-2">2. Caloric and Weight Management </h4>
        <p className="mb-4"> Forget the old adage of "eating for two." The need for additional energy gradually increases, focusing on nutrient-dense foods:
•	First Trimester: Typically no extra calories needed.
•	Second Trimester: Approximately $340$ extra calories per day.
•	Third Trimester: Approximately $450$ extra calories per day.
Maintaining an appropriate, gradual weight gain is essential for a healthy pregnancy and should be discussed with your healthcare provider.
</p>
        <h4 className="text-xl font-semibold text-secondary mb-2">3. Food Safety: What to Avoid</h4>
        <p>Certain foods can pose a risk of foodborne illnesses, which can be harmful during pregnancy. Be vigilant about food safety:
•	Avoid: Unpasteurized dairy and soft cheeses unless pasteurized, raw or undercooked meat and eggs, high-mercury fish, and raw sprouts.
•	Limit: Deli/lunch meats and hot dogs unless heated until steaming hot.
•	Restrict: Totally reduce caffeine intake.
•	Zero Tolerance: Alcohol should be avoided entirely.
By prioritizing these nutrition essentials, ensuring proper supplementation, and adhering to basic food safety guidelines, you are giving your baby the best possible start and supporting a strong, healthy pregnancy for yourself.
 </p>  </> ),
 
  },
  {
    id: 3,
    image: article3,
    title: "Sleep Training Myths and Facts",
   
    content: ( <> <p className="mb-4">Sleep training—the process of helping a baby or toddler learn to fall asleep and fall back asleep independently—is one of the most debated topics in modern parenting. Sorting through the advice can be challenging, but understanding the research and separating common myths from facts can help you choose the right path for your family.
 </p>
        <h4 className="text-xl font-semibold text-secondary mb-2">Key Myths Debunked </h4>
        <p className="mb-4">😴 Sleep Training: Myths and Facts
Sleep training—the process of helping a baby or toddler learn to fall asleep and fall back asleep independently—is one of the most debated topics in modern parenting. Sorting through the advice can be challenging, but understanding the research and separating common myths from facts can help you choose the right path for your family.
________________________________________
Key Myths Debunked
1. Myth: Sleep Training Means "Cry It Out" CIO
•	Fact: CIO is just one method, and often the most controversial one. Sleep training is an umbrella term that includes a variety of approaches, many of which are much gentler and involve parental presence.
o	Gentle/Gradual Methods like the Fading or Pick-Up/Put-Down methods aim to slowly reduce parental intervention while the child is learning to self-soothe.
o	Cry It Out methods typically involve minimal or no checks after the baby is put down.
o	Controlled Crying/Ferber methods involve checking on the baby at gradually increasing time intervals.
2. Myth: Later Bedtime = Sleeping In
•	Fact: The opposite is often true. Putting a baby to bed too late usually results in a worse night's sleep. Overtired babies produce stress hormones that make it harder to fall asleep and stay asleep, leading to frequent night awakenings and often earlier morning wake-ups. Following your baby's natural sleep cues for an early bedtime often between 6:00 and 7:30 PM often leads to longer, more consolidated sleep.
3. Myth: Sleep Training Harms the Baby's Attachment or Brain Development
•	Fact: Extensive research suggests that behavioral sleep training methods do not harm the parent-child attachment or the child's long-term emotional and behavioral development.
o	Some studies that measured the stress hormone cortisol in babies during training initially showed high levels, even after the crying stopped, leading to concerns.
o	However, other studies, including long-term follow-ups up to 5 years, have found no negative long-lasting effects on child behavior, relationships, or cortisol levels compared to control groups. In fact, some studies show a decrease in infant cortisol levels after successful sleep training, possibly because consolidated sleep reduces stress for the infant.
4. Myth: All Babies Will Naturally Sleep Through the Night by 6 Months
•	Fact: While many babies are physically capable of sleeping 6-8 hour stretches without a feeding by 4-6 months, the ability to fall back to sleep independently after a natural wake-up is a learned skill. All humans wake up multiple times during the night between sleep cycles. Babies who haven't learned to self-soothe often cry out for the parent to help them bridge those wake-ups.

 </p>
        <h4 className="text-xl font-semibold text-secondary mb-2">Confirmed Facts About Sleep Training </h4>
        <p className="mb-4"> 1. Fact: Consistency is the Single Most Important Factor
•	No matter which method you choose—gentle, gradual, or extinction—consistency is key to success. If the child receives an inconsistent response, the crying phase often lasts longer, as they remain hopeful that a different response will come.
2. Fact: Sleep Training Can Improve Parental Mental Health
•	Evidence strongly shows that improving a child's sleep significantly reduces parental stress, anxiety, and symptoms of depression. Better sleep for the parents translates to better mental health, which in turn benefits the parent-child relationship during the day.
3. Fact: Sleep Training is Not a Quick Fix for All Wake-Ups
•	Even the most "trained" sleepers will still wake up due to illness, teething, developmental leaps, or growth spurts. Sleep training is about teaching the skill of independent settling, not eliminating all wake-ups forever.
4. Fact: Establishing a Bedtime Routine is Essential for Success
•	A predictable, calming routine e.g., bath, book, cuddle, song, is a powerful cue that signals to the child that it is time to transition to sleep. This routine helps regulate their internal body clock, circadian rhythm and is a foundational step in any sleep method.

</p>
        <h4 className="text-xl font-semibold text-secondary mb-2">The Takeaway </h4>
        <p>Sleep training is a highly personal decision. The current body of scientific evidence suggests that behavioral sleep techniques are effective for improving infant sleep problems and parental mood in the short-to-medium term, with no evidence of long-term harm to the child. The best approach is the one that aligns with your family's philosophy and that you can implement consistently.
 </p>  </> )

,
  },
  {
    id: 4,
    image: article4,
    title: "Postpartum Mental Wellness: Recognizing the Signs",
    
    content: <p>Full content on postpartum mental wellness goes here...</p>,
  },
  {
    id: 5,
    image: article5,
    title: "The Importance of Pediatric Checkups",
    
    content: <p>Full content on pediatric checkups goes here...</p>,
  },
];

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articleToDisplay = articles.find(a => a.id === selectedArticle);

  
  if (articleToDisplay) {
    return (
      <div className="py-12 px-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl min-h-[70vh]">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="text-primary hover:text-secondary font-semibold mb-6 flex items-center"
        >
          &larr; Back to Articles
        </button>
        <h2 className="text-4xl font-bold text-primary mb-4">{articleToDisplay.title}</h2>
        <div className="text-gray-700 leading-relaxed">
          {articleToDisplay.content}
        </div>
      </div>
    );
  }

  
  return (
    <div className="py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-primary mb-10">Mamacare Articles Index</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {articles.map((a) => (
          <div 
            key={a.id} 
            onClick={() => setSelectedArticle(a.id)}
            className="flex items-center bg-white rounded-2xl p-4 shadow-md border-l-4 border-primary hover:shadow-xl hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer text-left"
          >
            {}
            <img 
              src={a.image} 
              alt={a.title} 
              className="w-16 h-16 object-cover rounded-full mr-4 shadow" 
            />
            {}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-1">{a.title}</h3>
              <p className="text-sm text-gray-600 truncate">{a.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}