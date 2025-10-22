"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden group">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 group-hover:from-primary/30 group-hover:via-accent/30 group-hover:to-primary/30 transition-all duration-500" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/50" />

          <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r from-primary/50 via-accent/50 to-primary/50 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative p-12 sm:p-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Ready to Protect Your Organization?</h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations using DeepGuard to detect and prevent deepfake attacks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent hover:bg-primary/5 transition-all hover:scale-105"
              >
                Schedule Demo
              </Button>
            </div>

            <p className="text-sm text-foreground/50 mt-8">No credit card required. Get started in minutes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
