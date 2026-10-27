import React, { useState } from 'react';
import { X, Sparkles, BookOpen, Download, Heart, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { useLeads } from '../context/LeadContext';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

interface LipCombo {
  id: string;
  title: string;
  mood: string;
  vibeTag: string;
  occasion: string;
  liner: string;
  glossipProduct: string;
  shadeHex: string;
  steps: string[];
  swatchGradient: string;
}

const LIP_COMBOS: LipCombo[] = [
  {
    id: 'combo-1',
    title: 'The 90s Brownie Glaze',
    mood: 'Nude Crush',
    vibeTag: 'Iconic 90s Supermodel Lip',
    occasion: 'Campus coffee runs, dinner dates, golden hour selfies',
    liner: 'Warm deep cinnamon brown lip pencil',
    glossipProduct: 'Glaze Drip High-Shine in Nude Squeeze',
    shadeHex: '#C58C73',
    steps: [
      'Line and softly overline cupid’s bow with a rich brown pencil',
      'Feather the edges inward with your fingertip to diffuse sharp edges',
      'Generously coat with Glaze Drip in Nude Squeeze using the XL Cloud Doe-Foot wand for that viral juicy chai-latte gloss'
    ],
    swatchGradient: 'from-[#8C5843] via-[#C58C73] to-[#E3B89E]'
  },
  {
    id: 'combo-2',
    title: 'The Viral Cherry Drip',
    mood: 'Cherry Girl',
    vibeTag: 'Juicy Black Cherry Vixen',
    occasion: 'Night-outs, party glams, bold main character moments',
    liner: 'Sheer berry-plum lip stain or pencil',
    glossipProduct: 'Nectar Dew Nourishing Lip Oil in Juicy Cherry',
    shadeHex: '#C9204B',
    steps: [
      'Dab a tiny dot of berry stain on the center of bare lips',
      'Glide Nectar Dew in Juicy Cherry over entire lip surface using the hugging paddle wand',
      'Notice how the squalane formula reacts to lip warmth for a custom glass ruby tint'
    ],
    swatchGradient: 'from-[#6E142F] via-[#C9204B] to-[#F04F87]'
  },
  {
    id: 'combo-3',
    title: 'The Coquette Princess',
    mood: 'Pink Princess',
    vibeTag: 'Ethereal Baby Pink Dew',
    occasion: 'Sunday brunches, GRWM videos, romantic pastel looks',
    liner: 'Dusty petal-pink contour pencil',
    glossipProduct: 'Glaze Drip Lip Gloss in Baby Princess',
    shadeHex: '#FFAEC9',
    steps: [
      'Trace your natural lip contour with a soft rosy nude pencil',
      'Swipe 1 dip of Glaze Drip in Baby Princess across upper and lower lip',
      'The micro-crystals reflect ambient light giving lips an instant visual plump effect'
    ],
    swatchGradient: 'from-[#E58DAA] via-[#FFAEC9] to-[#FFF0B8]'
  },
  {
    id: 'combo-4',
    title: 'The Pure Glass Clean Girl',
    mood: 'Clear Obsession',
    vibeTag: 'High-Fashion Mirror Reflection',
    occasion: 'Gym runs, clean girl minimal routines, everyday hydration',
    liner: 'Bare lips or neutral lip conditioner',
    glossipProduct: 'Glaze Drip in Glass Milk + Nectar Dew in Rose Petal',
    shadeHex: '#FFFFFF',
    steps: [
      'Apply a thin veil of Rose Petal Dew oil for botanical antioxidant nourishment',
      'Top with a thick glaze of Glass Milk for blinding optical clarity',
      'Lips appear 2x fuller with zero tackiness'
    ],
    swatchGradient: 'from-[#E2E8F0] via-[#FFFFFF] to-[#F8DCE7]'
  }
];

export const LipComboGuideModal: React.FC = () => {
  const { isLipGuideOpen, setIsLipGuideOpen } = useLeads();
  const { addToCart, setIsCartOpen } = useShop();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isLipGuideOpen) return null;

  const handleDownload = () => {
    // Generate text/markdown guide file download for genuine offline saving
    const content = `# THE ULTIMATE GLOSSIP LIP COMBO GUIDE 💋
Created exclusively for Glossip Club Besties

${LIP_COMBOS.map(c => `
## ${c.title.toUpperCase()}
* Occasion: ${c.occasion}
* Vibe: ${c.vibeTag}
* Lip Liner: ${c.liner}
* Glossip Hero: ${c.glossipProduct}
* Steps:
${c.steps.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}
-------------------------------------------------
`).join('\n')}

© Glossip Beauty. Spill the gloss, not the tea ♡
`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'The_Ultimate_Glossip_Lip_Combo_Guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleAddComboProducts = (comboId: string) => {
    if (comboId === 'combo-1') {
      const p = PRODUCTS.find(pr => pr.id === 'glaze-drip-nude-squeeze');
      if (p) addToCart(p, 'Nude Squeeze', 1);
    } else if (comboId === 'combo-2') {
      const p = PRODUCTS.find(pr => pr.id === 'nectar-dew-juicy-cherry');
      if (p) addToCart(p, 'Juicy Cherry', 1);
    } else if (comboId === 'combo-3') {
      const p = PRODUCTS.find(pr => pr.id === 'glaze-drip-baby-princess');
      if (p) addToCart(p, 'Baby Princess', 1);
    } else {
      const p1 = PRODUCTS.find(pr => pr.id === 'glaze-drip-glass-milk');
      if (p1) addToCart(p1, 'Glass Milk', 1);
    }
    setIsLipGuideOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsLipGuideOpen(false)}
      />

      <div className="relative bg-[#FFF9F4] rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-[#FFC4DC] z-10 max-h-[92vh] overflow-y-auto my-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F8DCE7]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#F04F87]" />
            <h2 className="font-brand text-lg sm:text-xl font-bold text-[#563A45]">
              The Ultimate Glossip Lip Combo Guide 💋
            </h2>
          </div>
          <button
            onClick={() => setIsLipGuideOpen(false)}
            className="p-1.5 text-[#563A45]/70 hover:text-[#563A45] hover:bg-[#F8DCE7] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Introduction */}
        <div className="my-5 p-5 bg-gradient-to-r from-[#FFC4DC]/40 via-white to-[#E8DDF8]/40 rounded-2xl border border-[#FFC4DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F04F87]">
              Exclusive Subscriber Handbook
            </span>
            <h3 className="font-brand text-lg font-extrabold text-[#563A45]">
              Master the Viral Juicy Lip Looks
            </h3>
            <p className="text-xs text-[#563A45]/80 max-w-md">
              Formulated for Indian skin undertones. Layer our high-refractive glass glosses with your favourite everyday liners.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-[#F04F87] hover:bg-[#D83870] text-white text-xs font-bold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Guide!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save Offline Copy</span>
              </>
            )}
          </button>
        </div>

        {/* 4 Lip Combos */}
        <div className="space-y-4">
          {LIP_COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-2xl p-5 border border-[#F8DCE7] hover:border-[#FFC4DC] hover:shadow-sm transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${combo.swatchGradient} shadow-inner border-2 border-white`}
                  />
                  <div>
                    <h4 className="font-brand font-bold text-base text-[#563A45]">{combo.title}</h4>
                    <span className="text-[11px] font-semibold text-[#F04F87]">{combo.vibeTag}</span>
                  </div>
                </div>

                <span className="text-xs bg-[#FFF9F4] px-3 py-1 rounded-full text-[#563A45]/80 border border-[#F8DCE7]">
                  Occasion: {combo.occasion}
                </span>
              </div>

              {/* Combo Blueprint */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#FFF9F4] rounded-xl border border-[#F8DCE7]">
                  <strong className="text-[#563A45] block mb-0.5">Pencil Base:</strong>
                  <span className="text-[#563A45]/80">{combo.liner}</span>
                </div>
                <div className="p-3 bg-[#FFF9F4] rounded-xl border border-[#F8DCE7]">
                  <strong className="text-[#F04F87] block mb-0.5">Glossip Hero:</strong>
                  <span className="text-[#563A45]/80">{combo.glossipProduct}</span>
                </div>
              </div>

              {/* Application Steps */}
              <div className="space-y-1.5 pt-1">
                <strong className="text-[11px] uppercase tracking-wider text-[#563A45]/70 block">
                  Application Routine:
                </strong>
                <ol className="list-decimal list-inside space-y-1 text-xs text-[#563A45]/85">
                  {combo.steps.map((st, i) => (
                    <li key={i} className="leading-relaxed">{st}</li>
                  ))}
                </ol>
              </div>

              {/* Quick Add Combo Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleAddComboProducts(combo.id)}
                  className="px-4 py-2 bg-[#FFF9F4] hover:bg-[#F8DCE7] border border-[#F8DCE7] text-[#563A45] hover:text-[#F04F87] text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#F04F87]" />
                  <span>Add {combo.glossipProduct.split(' in ')[1] || 'Shade'} to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-[#F8DCE7] text-center text-xs text-[#563A45]/70">
          Tip: Always blend lip pencil inward before applying Glossip for zero harsh line demarcation ♡
        </div>

      </div>
    </div>
  );
};
