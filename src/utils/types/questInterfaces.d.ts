export interface Quest {
  questName: string;      
  description: string;    
  reward: string;
  expiryDate?: Date;       
  progress?: number;       // 0-100
  completed: boolean;
}

export interface QuestConfig {
  nameKey: string;              
  descriptionKey: string;      
  reward: string;
  expiryDate?: Date;            
  expiryMs?: number;           
  progress?: number;            // Default 0
  completed: boolean;          
}
