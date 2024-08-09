import { Model } from "@nozbe/watermelondb";
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Task extends Model {
    static table = 'tasks';
    
    @text('description') description: any;
    @field('complete') complete: any;
    @text('image') image: any;
}