
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"

const ProductSlider = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    
    // Set initial value
    onSelect()

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const getButtonColor = (productId: string) => {
    switch (productId) {
      case 'sliczole':
        return 'bg-[#025a8a] border-[#025a8a] hover:bg-[#024b75] text-white'
      case 'insotek':
        return 'bg-orange-500 border-orange-500 hover:bg-orange-600 text-white'
      case 'agnus':
        return 'bg-[#8b2a6b] border-[#8b2a6b] hover:bg-[#7a2459] text-white'
      case 'funzil':
        return 'bg-[#2a6ca8] border-[#2a6ca8] hover:bg-[#245a92] text-white'
      default:
        return 'bg-gray-500 border-gray-500 hover:bg-gray-600 text-white'
    }
  }

  const buttonColorClass = products.length > 0 && products[current] ? getButtonColor(products[current].id) : ''


  return (
    <div className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Discover Our Range</h2>
        <Carousel
            setApi={setApi}
            className="w-full max-w-4xl mx-auto"
            opts={{ loop: true }}
            plugins={[
                Autoplay({
                    delay: 4000,
                    stopOnInteraction: true,
                }),
            ]}
        >
            <CarouselContent>
                {products.map((product) => (
                <CarouselItem key={product.id}>
                    <div className="p-1">
                        <Card className="border-none shadow-none bg-transparent">
                            <CardContent className={`relative flex items-center justify-center p-8 md:p-12 aspect-[16/7] rounded-2xl overflow-hidden bg-gradient-to-br ${product.color}`}>
                                <div className="grid md:grid-cols-2 gap-8 items-center w-full text-white">
                                    <div className="text-center md:text-left z-10">
                                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h3>
                                        <p className="mt-2 text-lg opacity-90">{product.composition}</p>
                                        <p className="mt-1 text-md opacity-80 font-medium">Form: {product.form}</p>
                                        <p className="mt-4 font-semibold text-lg">{product.indication}</p>
                                    </div>
                                    <div className="relative h-64 md:h-auto md:self-stretch">
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={cn(buttonColorClass)} />
            <CarouselNext className={cn(buttonColorClass)} />
        </Carousel>
    </div>
  );
};

export default ProductSlider;
